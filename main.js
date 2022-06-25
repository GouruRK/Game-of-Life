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
    for (let i=0; i <= columns; i++) {
        line = document.createElement("div");
        for (let j = 0; j <= rows; j++) {
            line.innerHTML += `<div class="cell white" id="${i}-${j}" onclick=change_status(event)></div>`;
        }
        grid.appendChild(line);
    }
}

function change_status(event) {
    if (event.target.className.split(" ")[1] == "white") {
        
        event.target.className = "cell black";
    } else {
        event.target.className = "cell white";
    }
}