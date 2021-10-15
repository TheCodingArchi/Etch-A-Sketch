let gridSize = 16;
const gridContainer = document.querySelector('.grid-container');
document.addEventListener('DOMContentLoaded', createGrid);

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
