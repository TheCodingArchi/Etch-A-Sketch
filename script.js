const gridContainer = document.querySelector('.grid-container');
const eraser = document.querySelector('button.eraser');
const clearSketchBtn = document.querySelector('button.clear-sketch');
// const drawBtn = document.querySelector('button.draw');
const slider = document.querySelector('span > input');
const gridSizeDisplay = document.querySelector('span > p');

document.addEventListener('DOMContentLoaded', createGrid);
slider.addEventListener('input', setNewGridSize);
eraser.addEventListener('click', erase);
clearSketchBtn.addEventListener('click', clearDrawing);
// drawBtn.addEventListener('click', draw);

function createGrid() {
    const gridSize = slider.value;
    gridSizeDisplay.textContent = `${gridSize} x ${gridSize} Grid`;

    for (let i = 1; i <= gridSize ** 2; i++) {
        const grid = document.createElement('div');
        grid.style.height = `calc(100% / ${gridSize})`;
        grid.style.width = `calc(100% / ${gridSize})`;
        grid.style.border = '1px solid #e4e4e4';
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

// function displayInputBox() {
//     const inputBox = document.querySelector('main ~ section');
//     removeGrid();
//     inputBox.style.display = 'initial';
// }

function setNewGridSize() {
    removeGrid();
    createGrid();
}

function draw() {
    const rows = document.querySelectorAll('.grid-container > div');
    let isDrawing = false;

    rows.forEach(row => {
        row.addEventListener('mousedown', (e) => {
            isDrawing = true;
            e.target.style.backgroundColor = getRandomColors();
        });
    });

    rows.forEach(row => {
        row.addEventListener('mouseover', (e) => {
            if (isDrawing === true) {
                e.target.style.backgroundColor = getRandomColors();
            }
        });
    });

    window.addEventListener('mouseup', () => {
        isDrawing = false;
    })
}

function clearDrawing() {
    const rows = document.querySelectorAll('.grid-container > div');
    rows.forEach(row => {
        row.style.backgroundColor = 'initial';
    });
}

function erase() {    
    const rows = document.querySelectorAll('.grid-container > div');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'initial';
        });

        row.addEventListener('mousedown', () => {
            row.style.backgroundColor = 'initial';
        });
    });
}

function getRandomColors() {
    const randomColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomNumber = (Math.floor(Math.random() * 10)) % 7;
    const randomColor = randomColors[randomNumber];
    return randomColor;
}

