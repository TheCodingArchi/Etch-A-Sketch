let gridSize = 16;
const gridContainer = document.querySelector('.grid-container');
const changeGridSizeBtn = document.querySelector('button.change-grid-size');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', createGrid);
changeGridSizeBtn.addEventListener('click', displayInputBox);
form.addEventListener('submit', setNewGridSize);

function createGrid() {
    for (let i = 1; i <= gridSize; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        gridRow.style.height = `calc(100% / ${gridSize})`;
        gridContainer.appendChild(gridRow);

        for (let j = 1; j <= gridSize; j++) {
            const gridColumn = document.createElement('div');
            gridColumn.classList.add('grid-column');
            gridRow.appendChild(gridColumn);
        }
    }
}

function removeGrid() {
    const rows = document.querySelectorAll('.grid-row');
    rows.forEach((row) => {
        row.parentNode.removeChild(row);
    });
}

function displayInputBox() {
    const inputBox = document.querySelector('main ~ section');
    removeGrid();
    inputBox.style.display = 'initial';
}
