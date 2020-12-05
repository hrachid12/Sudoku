let game_board = {
    "a":[5, 8, 6, 0, 7, 0, 0, 0, 0],
    "b":[0, 0, 0, 9, 0, 1, 6, 0, 0],
    "c":[0, 0, 0, 6, 0, 0, 0, 0, 0],
    "d":[0, 0, 7, 0, 0, 0, 0, 0, 0],
    "e":[9, 0, 2, 0, 1, 0, 3, 0, 5],
    "f":[0, 0, 5, 0, 9, 0, 0, 0, 0],
    "g":[0, 9, 0, 0, 4, 0, 0, 0, 8],
    "h":[0, 0, 3, 5, 0, 0, 0, 6, 0],
    "i":[0, 0, 0, 0, 2, 0, 4, 7, 0]
}

function check_selection (selected_cell, desired_num) {
    // This function checks if the user's selection is valid.
    // Returns true if it is, returns false otherwise


    // Row and col based on selected_cell
    let row = selected_cell.id[0];
    let col = selected_cell.id[1];

    // class_list_length used to determine which 3x3 box the cell is in
    // The length is the number of classes the cell currently has
    // The 3x3 box class will always be the length-2 index
    let class_list_length = selected_cell.classList.length;

    // Name of the 3x3 box the cell resides in on the game board
    let cell_box = selected_cell.classList[class_list_length - 2];

    // Get all cells in the 3x3 box
    let box = document.querySelectorAll("." + cell_box);
    

    // Check if desired_num already exists in the row
    for (var i = 0; i < game_board[row].length; i++) {
        let num = game_board[row][i]

        if (num === desired_num) {
            return false;
        }
    }

    // Check if desired_num already exists in the column
    for (key in game_board) {
        let num = game_board[key][col];

        if (num === desired_num) {
            return false;
        }
    }

    // Check if the desired_num already exists in the 3x3 box
    for (var j = 0; j < box.length; j++) {
        let cell = box[j];
        if (parseInt(cell.textContent) === desired_num) {
            return false;
        }
    }


    return true;
}


function check_game_solution () {
    console.log("checked")
}

document.querySelectorAll(".sudoku-cell").forEach(e => e.addEventListener("click", () => {
    let curr_cell = document.querySelector(".selected-cell");
    
    if (e.classList.contains("static-cell")) {
        // do nothing
    } else if (curr_cell == e) {
        curr_cell.classList.remove("selected-cell");
    } else if (curr_cell == null) {
        e.classList.add("selected-cell");
    } else {
        curr_cell.classList.remove("selected-cell");
        e.classList.add("selected-cell");
    }
}))

document.querySelectorAll(".num-select").forEach(n => n.addEventListener("click", () => {
    let cell = document.querySelector(".selected-cell");

    let res = check_selection(cell, parseInt(n.textContent));
    console.log(res);
    if (!res) {
        cell.classList.add("incorrect");
    } else {
        cell.classList.remove("incorrect");
    }

    cell.textContent = n.textContent;

    if (parseInt(n.textContent) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        game_board[cell.id[0]][cell.id[1]] = parseInt(n.textContent);
    } else {
        game_board[cell.id[0]][cell.id[1]] = 0;
    }
})) 

document.querySelector(".btn").addEventListener("click", check_game_solution);
