"use strict";

// document.getElementById("one_step").addEventListener("click", refresh);
document.getElementById("validate").addEventListener("click", get_size);

function get_size() {
    let rows_button = document.getElementById("rows");
    let columns_button = document.getElementById("columns");
    let rows = parseInt(rows_button.value);
    let columns = parseInt(columns_button.value);
    rows_button.style.display = "none";
    columns_button.style.display = "none";
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

function get_neighbor(x, y) {
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
        cell = document.getElementById(`${abscissa}-${ordinate}`);
        colors.push(cell.className[1]);
    });
}