let gridSize = 16;
const gridContainer = document.querySelector('.grid-container');
const changeGridSizeBtn = document.querySelector('button.change-grid-size');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', createGrid);
changeGridSizeBtn.addEventListener('click', displayInputBox);
form.addEventListener('submit', setNewGridSize);


function createGrid() {
    for (let i = 1; i <= gridSize ** 2; i++) {
        const grid = document.createElement('div');
        grid.style.height = `calc(100% / ${gridSize})`;
        grid.style.width = `calc(100% / ${gridSize})`;
        grid.style.border = '1px solid grey';
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
        row.addEventListener('mouseover', () => {
            row.style.backgroundColor = '#000000';
        });
    })
}


