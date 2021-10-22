const eraser = document.querySelector('button.eraser');
const clearSketchBtn = document.querySelector('button.clear-sketch');
const gridSizePicker = document.querySelector('span > input');
const randomColorbtn = document.querySelector('.random-color');
const penColorBtn = document.querySelector('.pen-color');
const colorPalette = document.querySelector('.color-palette');

let penColor = '#000000'; // default color
penColorBtn.style.backgroundColor = penColor;

document.addEventListener('DOMContentLoaded', createGrid); // default grid settings
gridSizePicker.addEventListener('input', setNewGridSize);
eraser.addEventListener('click', toggleEraser);
clearSketchBtn.addEventListener('click', clearDrawing);
randomColorbtn.addEventListener('click', toggleRandomColors);
penColorBtn.addEventListener('click', displayColorPalette);

function createGrid() {
    const gridContainer = document.querySelector('.grid-container');
    const gridSize = gridSizePicker.value;
    const gridSizeDisplay = document.querySelector('span > p');
    gridSizeDisplay.textContent = `${gridSize} x ${gridSize} Grid`;

    for (let i = 1; i <= gridSize ** 2; i++) {
        const gridCell = document.createElement('div');
        gridCell.style.height = `calc(100% / ${gridSize})`;
        gridCell.style.width = `calc(100% / ${gridSize})`;
        gridContainer.appendChild(gridCell);
    }
    drawOrErase();
}

function removeGrid() {
    const gridCells = document.querySelectorAll('.grid-container > div');
    gridCells.forEach(gridCell => {
        gridCell.parentNode.removeChild(gridCell);
    });
}

function setNewGridSize() {
    removeGrid();
    createGrid();
}

function clearDrawing() {
    const pixels = document.querySelectorAll('.grid-container > div');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'initial';
    });
}

function toggleEraser() {    
    eraser.classList.toggle('eraser-active')
}

function toggleRandomColors() {
    randomColorbtn.classList.toggle('random-color-active');
}

function displayColorPalette() {
    colorPalette.style.display = 'flex';
    getPenColor();
}

function getPenColor() {
    const colors = document.querySelectorAll('main ~ section > button');
    colors.forEach(color => {
        color.style.backgroundColor = color.id;
        color.addEventListener('click', () => {
            colorPalette.style.display = 'none';
            penColor = color.id;
            penColorBtn.style.backgroundColor = penColor;
        })
    })
}

function getRandomColors() {
    const colorArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomNumber = Math.floor(Math.random() * 7);
    return colorArray[randomNumber];
}

function changePixelColor(e) {
    if (eraser.classList.contains('eraser-active')) {
        e.target.style.backgroundColor = 'initial';
    }
    else if (randomColorbtn.classList.contains('random-color-active')) {
        e.target.style.backgroundColor = getRandomColors();
    }
    else {
        e.target.style.backgroundColor = penColor;
    }
}

function drawOrErase() {
    const pixels = document.querySelectorAll('.grid-container > div');
    let isDrawing = false;

    pixels.forEach(pixel => {
        pixel.addEventListener('mousedown', (e) => {
            isDrawing = true;
            changePixelColor(e);
        });
    });

    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', (e) => {
            if (isDrawing === true) {
                changePixelColor(e);
            }
        });
    });

    window.addEventListener('mouseup', () => {
        isDrawing = false;
    })
}
