const eraser = document.querySelector('button.eraser');
const clearSketchBtn = document.querySelector('button.clear-sketch');
const gridSizePicker = document.querySelector('span > input');
const randomColorbtn = document.querySelector('.random-color');
const penColorBtn = document.querySelector('.pen-color');
const colorPalette = document.querySelector('.change-color-popup');

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
        const grid = document.createElement('div');
        grid.style.height = `calc(100% / ${gridSize})`;
        grid.style.width = `calc(100% / ${gridSize})`;
        // grid.style.border = '0.1px solid #e4e4e4';
        gridContainer.appendChild(grid);
    }
    draw();
}

function removeGrid() {
    const rows = document.querySelectorAll('.grid-container > div');
    rows.forEach((row) => {
        row.parentNode.removeChild(row);
    });
}

function setNewGridSize() {
    removeGrid();
    createGrid();
}

function clearDrawing() {
    const rows = document.querySelectorAll('.grid-container > div');
    rows.forEach(row => {
        row.style.backgroundColor = 'initial';
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

function draw() {
    const rows = document.querySelectorAll('.grid-container > div');
    let isDrawing = false;

    rows.forEach(row => {
        row.addEventListener('mousedown', (e) => {
            isDrawing = true;
            if (eraser.classList.contains('eraser-active')) {
                e.target.style.backgroundColor = 'initial';
            }
            else if (randomColorbtn.classList.contains('random-color-active')) {
                e.target.style.backgroundColor = getRandomColors();
            }
            else {
                e.target.style.backgroundColor = penColor;
            }
        });
    });

    rows.forEach(row => {
        row.addEventListener('mouseover', (e) => {
            if (isDrawing === true) {
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
        });
    });

    window.addEventListener('mouseup', () => {
        isDrawing = false;
    })
}
