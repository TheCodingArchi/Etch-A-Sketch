let gridSize = 16;
const gridContainer = document.querySelector('.grid-container');
const changeGridSizeBtn = document.querySelector('button.change-grid-size');
const form = document.querySelector('form');
const eraser = document.querySelector('button.eraser');
const clearSketchBtn = document.querySelector('button.clear-sketch');


document.addEventListener('DOMContentLoaded', createGrid);
changeGridSizeBtn.addEventListener('click', displayInputBox);
form.addEventListener('submit', setNewGridSize);
eraser.addEventListener('click', erase);
clearSketchBtn.addEventListener('click', clearDrawing);

function createGrid() {
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

function displayInputBox() {
    const inputBox = document.querySelector('main ~ section');
    removeGrid();
    inputBox.style.display = 'initial';
}

function setNewGridSize(event) {
    gridSize = document.querySelector('#grid-size-input').value;
    const inputBox = document.querySelector('main ~ section');
    createGrid();
    inputBox.style.display = 'none';
    event.preventDefault();
}

function draw() {
    const rows = document.querySelectorAll('.grid-container > div');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = getRandomColors();
        });
    });
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
    });
}

function getRandomColors() {
    const randomColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomNumber = (Math.floor(Math.random() * 10)) % 7;
    const randomColor = randomColors[randomNumber];
    return randomColor;
}

