"use strict";

// 0 -> dead -> white
// 1 -> alive -> black

let grid;
let interval;

document.getElementById("validate").addEventListener("click", init);
document.getElementById("one_step").addEventListener("click", addStep);
document.getElementById("play").addEventListener("click", play);
document.getElementById("stop").addEventListener("click", stopInterval);
document.getElementById("reset").addEventListener("click", reset);

/**
 * Get the size of the grid selected by the user
 * @returns {Array[number]}
 */
function getSize() {
    let width = document.getElementById("columns").value;
    let height = document.getElementById("rows").value;
    return [parseInt(width), parseInt(height)];
}

/**
 * Hide the inputs which allows the user to select the size of the grid
 */
function hideInputs() {
    hideList(document.getElementsByClassName("rows"));
    hideList(document.getElementsByClassName("columns"));
    document.getElementById("validate").style.display = "none";
}

/**
 * Hide all DOM elements containing in an array
 * @param {Array} array
 */
function hideList(array) {
    for (let element of array) {
        element.style.display = "none";
    }
}

/**
 * Display the controls button
 */
function displayControls() {
    document.getElementById("one_step").style.display = "block";
    document.getElementById("play").style.display = "block";
    document.getElementById("reset").style.display = "block";
}

/**
 * Initalisation of the game
 */
function init() {
    grid = new Grid(...getSize());
    hideInputs();
    displayControls();
    refreshStepsNumber();
    createGrid(grid);
}

/**
 * Update the counter of steps
 */
function refreshStepsNumber() {
    document.getElementById("steps").innerText = `Number of steps : ${grid.getSteps()}`;
}

/**
 * Update the grid according to Conway's rules
 */
function addStep() {
    grid.addStep();
    refreshGrid(grid);
    refreshStepsNumber();
}

/**
 * Create the visual grid
 * @param {Object} grid 
 */
function createGrid(grid) {
    let line;
    let game = document.getElementById("grid");
    for (let y = 0; y < grid.height; y++) {
        line = document.createElement("div");
        for (let x = 0; x < grid.width; x++) {
            line.innerHTML += `<div class="cell white" id="${x}-${y}" onclick="clickOnCell(event)"></div>`;
        }
        game.appendChild(line);
    }
}

/**
 * Update the visual grid
 * @param {Object} grid 
 */
function refreshGrid(grid) {
    let cell;
    for(let y=0; y < grid.height; y++) {
        for(let x=0; x < grid.width; x++) {
            cell = document.getElementById(`${x}-${y}`);
            if (grid.grid[y][x] == 0) {
                cell.className = "cell white";
            } else {
                cell.className = "cell black";
            }
        }
    }
}

/**
 * Change a cell status when it's clicked
 * @param {*} event 
 */
function clickOnCell(event) {
    let [x, y] = getCoords(event.target);
    grid.reverseStatus(x, y);
    refreshGrid(grid);
}

/**
 * Extract the coordinates of a cell containing in 
 * it's id attribute
 * @param {HTMLElement} cell 
 * @returns 
 */
function getCoords(cell) {
    let id = cell.id;
    id = id.split("-");
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);
    return [x, y];
}

/**
 * Play the game
 */
function play() {
    document.getElementById("play").style.display = "none";
    document.getElementById("stop").style.display = "block";
    interval = window.setInterval(() => {
        grid.addStep();
        refreshGrid(grid);
        refreshStepsNumber();
    }, 500);
}

/**
 * Stop the game
 */
function stopInterval() {
    document.getElementById("play").style.display = "block";
    document.getElementById("stop").style.display = "none";
    clearInterval(interval);
}

/**
 * Reset the game
 */
function reset() {
    stopInterval();
    grid.reset();
    deleteGrid();
    createGrid(grid);
    grid.setSteps(0);
    refreshStepsNumber();
}

/**
 * Delete the actual visual grid
 */
function deleteGrid() {
    let parent = document.getElementById("grid");
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}
