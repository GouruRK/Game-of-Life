"use strict";

document.getElementById("one_step").addEventListener("click", add_step);
document.getElementById("validate").addEventListener("click", init);

function init() {
    let size = get_size();
    let rows = size[0];
    let columns = size[1];
    document.getElementById("rows").style.display = "none";
    document.getElementById("columns").style.display = "none";
    document.getElementById("validate").style.display = "none";
    document.getElementById("one_step").style.display = "block";
    load_grid(rows, columns)
}

function load_grid(rows, columns) {
    let line;
    let grid = document.getElementById("grid");
    for (let y=0; y < columns; y++) {
        line = document.createElement("div");
        for (let x = 0; x < rows; x++) {
            line.innerHTML += `<div class="cell white" id="${x}-${y}" onclick=click_on_cell(event)></div>`;
        }
        grid.appendChild(line);
    }
}

function click_on_cell(event) {
    return change_status(event.target)
}

function change_status(element) {
    if (element.className.split(" ")[1] == "white") {
        element.className = "cell black";
    } else {
        element.className = "cell white";
    }
}

function count(list, element) {
    return list.reduce((prev, curr) => {
        if (curr == element) {
            return prev + 1
        }
        return prev
    }, 0)
}

function get_neighbors(x, y) {
    let size = get_size();
    let rows = size[0];
    let columns = size[1];
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
    let colors = [];
    let abscissa;
    let ordinate;
    let cell;
    neighbors.forEach(neighbor => {
        abscissa = neighbor[0];
        ordinate = neighbor[1];
        if (0 <= abscissa && abscissa < columns) {
            if (0 <= ordinate && ordinate < rows) {
                cell = document.getElementById(`${abscissa}-${ordinate}`);
                colors.push(cell.className.split(" ")[1]);
            }
        }
    });
    return colors;
}

function get_size() {
    let rows_button = document.getElementById("rows");
    let columns_button = document.getElementById("columns");
    let rows = parseInt(rows_button.value);
    let columns = parseInt(columns_button.value);
    return [rows, columns]
}

function add_step() {
    let size = get_size();
    let rows = size[0];
    let columns = size[1];
    let cell;
    let cell_color;
    let nb_neighbors;
    let neighbors_colors;
    let to_change = [];
    for (let y=0; y < columns; y++) {
        for (let x=0; x < rows; x++) {
            neighbors_colors = get_neighbors(x, y);
            console.log(neighbors_colors)
            cell = document.getElementById(`${x}-${y}`);
            cell_color = cell.className.split(" ")[1];
            nb_neighbors = count(neighbors_colors, "white");
            if (cell_color === "black" && nb_neighbors === 3) {
                to_change.push(cell);
            } else {
                if (cell_color === "white") {
                    if (!(nb_neighbors !== 2 && nb_neighbors !== 3)) {
                        to_change.push(cell)
                    }
                }
            }
        } 
    }
    to_change.forEach(cell => {
        change_status(cell);
    });
}