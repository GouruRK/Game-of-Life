"use strict";

// 0 = dead = white
// 1 = alive = black

let grid;
let interval;

document.getElementById("validate").addEventListener("click", init)
document.getElementById("one_step").addEventListener("click", addStep)
document.getElementById("play").addEventListener("click", play);
document.getElementById("stop").addEventListener("click", stopInterval);
document.getElementById("reset").addEventListener("click", reset);


function getSize() {
    let width = document.getElementById("columns").value;
    let height = document.getElementById("rows").value;
    return [parseInt(width), parseInt(height)];
}

function hideInputs() {
    hideList(document.getElementsByClassName("rows"));
    hideList(document.getElementsByClassName("columns"));
    document.getElementById("validate").style.display = "none"
}

function hideList(list) {
    for (let element of list) {
        element.style.display = "none"
    }
}

function displayControls() {
    document.getElementById("one_step").style.display = "block";
    document.getElementById("play").style.display = "block"
    document.getElementById("reset").style.display = "block"
}

function init() {
    grid = new Grid(...getSize())
    hideInputs();
    displayControls();
    refreshStepsNumber();
    createGrid(grid)
}

function refreshStepsNumber() {
    document.getElementById("steps").innerText = `Number of steps : ${grid.getSteps()}`;
}

function addStep() {
    grid.addStep();
    refreshGrid(grid);
    refreshStepsNumber();
}

function createGrid(grid) {
    let line;
    let game = document.getElementById("grid");
    for (let y=0; y < grid.height; y++) {
        line = document.createElement("div");
        for (let x = 0; x < grid.width; x++) {
            line.innerHTML += `<div class="cell white" id="${x}-${y}" onclick="clickOnCell(event)"></div>`;
        }
        game.appendChild(line);
    }
}

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

function clickOnCell(event) {
    let [x, y] = getCoords(event.target);
    grid.reverseStatus(x, y);
    refreshGrid(grid);
}

function getCoords(cell) {
    let id = cell.id;
    id = id.split("-");
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);
    return [x, y]
}

function play() {
    document.getElementById("play").style.display = "none";
    document.getElementById("stop").style.display = "block";
    interval = window.setInterval(() => {
        grid.addStep();
        refreshGrid(grid);
        refreshStepsNumber();
    }, 500);
}

function stopInterval() {
    document.getElementById("play").style.display = "block";
    document.getElementById("stop").style.display = "none";
    clearInterval(interval);
}

function reset() {
    stopInterval();
    grid.reset();
    deleteGrid();
    createGrid(grid);
    grid.setSteps(0);
    refreshStepsNumber();
}

function deleteGrid() {
    let parent = document.getElementById("grid");
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}
