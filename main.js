"use strict";

/*
0 -> dead -> white
1 -> live -> black
*/

document.getElementById("one_step").addEventListener("click", add_step);
document.getElementById("validate").addEventListener("click", init);

let grid = [];
let rows;
let columns;

function hide_inputs() {
    document.getElementById("rows").style.display = "none";
    document.getElementById("columns").style.display = "none";
    document.getElementById("validate").style.display = "none";
    document.getElementById("one_step").style.display = "block";
}

function init() {
    get_size();
    hide_inputs();
    load_grid(rows, columns);
    let temp;
    for (let y = 0; y < columns; y++) {
        temp = [];
        for (let x = 0; x < rows; x++) {
            temp.push(0)
        }
        grid.push(temp);
    }
}

function get_size() {
    let rows_button = document.getElementById("rows");
    let columns_button = document.getElementById("columns");
    rows = parseInt(rows_button.value);
    columns = parseInt(columns_button.value);
}

function load_grid(rows, columns) {
    let line;
    let grid = document.getElementById("grid");
    for (let y=0; y < rows; y++) {
        line = document.createElement("div");
        for (let x = 0; x < columns; x++) {
            line.innerHTML += `<div class="cell white" id="${x}-${y}" onclick=click_on_cell(event)></div>`;
        }
        grid.appendChild(line);
    }
}

function refresh_grid(grid) {
    let cell;
    for(let y=0; y < rows; y++) {
        for(let x=0; x < columns; x++) {
            cell = document.getElementById(`${x}-${y}`);
            if (grid[y][x] == 0) {
                cell.className = "cell white";
            } else {
                cell.className = "cell black";
            }
        }
    }
}

function get_coords(cell) {
    let id = cell.id
    id = id.split("-");
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);
    return [x, y]
}

function click_on_cell(event) {
    return change_status(event.target)
}

function change_status(cell) {
    let [x, y] = get_coords(cell);
    grid[y][x] = grid[y][x] == 1 ? 0 : 1;
    refresh_grid(grid);
}

function click_on_cell(event) {
    return change_status(event.target);
}

function get_arround(x, y) {
    let neighbors = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x - 1, y + 1],
        [x - 1, y]
    ]
    let status = [];
    neighbors.forEach(cell => {
        let [xi, yi] = cell;    
        if (0 <= xi && xi < columns && 0 <= yi && yi < rows) {
            status.push(grid[yi][xi]);
        }
    });
    return status;
}

function add_step() {
    let new_grid = [];
    let arround;
    let cells_alive = 0;
    for (let y=0; y < rows; y++) {
        let temp = [];
        for (let x=0; x < columns; x++) {
            arround = get_arround(x, y);
            cells_alive = arround.reduce((prev, current) => {
                return current == 1 ? prev + 1 : prev
            }, 0);
            temp.push(Number((cells_alive == 3) || (grid[y][x] == 1 && cells_alive == 2)))
        }
        new_grid.push(temp);
    }
    grid = new_grid;
    refresh_grid(new_grid);
}


function set_pulsar() {
    hide_inputs();
    rows = 17;
    columns = 17;
    load_grid(rows, columns);
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    refresh_grid(grid)
}