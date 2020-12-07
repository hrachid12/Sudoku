const VALID_SUM = 45;

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

let boxes = [".top-left", ".top-mid", ".top-right", ".mid-left", ".mid-mid", ".mid-right", ".bot-left", ".bot-mid", ".bot-right"];

function check_game_solution () {
    // This function contains the algorithm that verifys the users solution to the puzzle
    
    // num_present is an int value that keeps track of how many times an integer is present in a row/col/box
    let num_present = 0;

    // First check each 3x3 box
    // Iterate over the boxes on the board
    for (var i = 0; i < boxes.length; i++) {
        // Select all the cells with the current box class
        let box_cells = document.querySelectorAll(boxes[i]);

        // Sum of all integers in the box
        // Valid solution will equal VALID_SUM
        let box_sum = 0;

        // Iterate from 1 to 9 to check if each cell contains the integer
        for (var j = 1; j <= box_cells.length; j++) {
            // Iterate over the cells to see if it contains integer j
            for (var k = 0; k < box_cells.length; k++) {
                // Get the row and column of the current cell
                let row = box_cells[k].id[0];
                let col = box_cells[k].id[1];

                // Check if the cell equals integer j
                // Increment counter by 1 if it does
                if (game_board[row][col] === j) {
                    num_present += 1; 
                }
            }   

            // Add j to the sum 
            box_sum = box_sum + j;
            
            // If integer j was present more than once in the box, attempt is invalid
            if (num_present !== 1) {
                return false
            } else {
                // Otherwise, reset counter for next integer
                num_present = 0;
            }
        }

        // check the calculated sum against the valid sum
        // Return false if they aren't equal
        if (box_sum !== VALID_SUM) {
            return false
        }
    }

    // Reset counter
    num_present = 0;

    // Second, check each row
    // Iterate over each row
    for (key in game_board) {
        // Sum of all integers in the row
        // Valid solution will equal VALID_SUM
        let row_sum = 0;

        // Iterate from 1 to 9 to check if each cell contains the integer
        for (var i = 1; i <= game_board[key].length; i++) {
            // Iterate over the cells in the row to see if it contains integer i
            for (var cell = 0; cell < game_board[key].length; cell++) {
                // Check if the cell equals integer i
                // Increment counter by 1 if it does
                if (game_board[key][cell] === i) {
                    num_present += 1;
                }
            }

            row_sum = row_sum + i;

            // If integer i was present more than once in the box, attempt is invalid
            if (num_present !== 1) {
                return false
            } else {
                // Otherwise, reset counter for next integer
                num_present = 0;
            }
        }
        // check the calculated sum against the valid sum
        // Return false if they aren't equal
        if (row_sum !== VALID_SUM) {
            return false
        }
    }

    // Reset counter
    num_present = 0;

    // Check each column
    // Iterate over each column
    for (var col = 0; col < game_board.length ; col++) {
        // Sum of all integers in the col
        // Valid solution will equal VALID_SUM
        let col_sum = 0;

        // Iterate from 1 to 9 to check if each cell contains the integer
        for (var i = 1; i <= game_board.length; i++) {
            // Iterate over the rows within the column to see if it contains the int i
            // Each row is represented by the key
            for (key in game_board) {
                if (game_board[key][col] === i) {
                    num_present += 1;
                }
            }
            
            col_sum = col_sum + i;

            // If integer i was present more than once in the box, attempt is invalid
            if (num_present !== 1) {
                return false
            } else {
                // Otherwise, reset counter for next integer
                num_present = 0;
            }
        }

        // check the calculated sum against the valid sum
        // Return false if they aren't equal
        if (col_sum !== VALID_SUM) {
            return false
        }
    }
    
    // All tests pass, return true
    return true;
}


function check_selection (selected_cell, desired_num) {
    // This function checks if the user's selection for a cell is valid.
    // Returns true if it is, returns false otherwise

    // Special case for input from keyboard
    if (desired_num === 0) {
        return true;
    }

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


// Add an event listener to each game board cell
document.querySelectorAll(".sudoku-cell").forEach(e => e.addEventListener("click", () => {
    // curr_cell points to the selected cell (one that a user already clicked and is highlighted in blue)
    let curr_cell = document.querySelector(".selected-cell");
    
    // Static cells cannot be selected
    if (e.classList.contains("static-cell")) {
        // do nothing
    } 
    // If the selected cell was clicked again, de-select it
    else if (curr_cell === e) {
        curr_cell.classList.remove("selected-cell");
    } 
    // If there wasn't a selected cell, highlight the clicked cell
    else if (curr_cell === null) {
        e.classList.add("selected-cell");
    } 
    // Otherwise, de-select the highlighted cell and then select the clicked cell
    else {
        curr_cell.classList.remove("selected-cell");
        e.classList.add("selected-cell");
    }
}))


// Adds an event listener to the number selection on the bottom of the page
document.querySelectorAll(".num-select").forEach(n => n.addEventListener("click", () => {
    // Cell points to the selected cell - the one highlighted in blue
    let cell = document.querySelector(".selected-cell");
    
    if (cell !== null) {
        // Check if the user's selection for the cell is valid
        let res = check_selection(cell, parseInt(n.textContent));
        
        // If not, add the 'incorrect' class to the cell -- this highlights the cell in red
        if (!res) {
            cell.classList.add("incorrect");
        } 
        // Otherwise, remove the 'incorrect' class from the cell
        else {
            cell.classList.remove("incorrect");
        }

        // Update the cell's value to the user's selection
        cell.textContent = n.textContent;

        // If the user selected one of the cells labeled 1-9, that number is placed on the 
        // Correct position on the game board
        // If the user selected the empty cell, then 0 is placed on the game board
        // The position on the game board is determined using the cell's id
        if (parseInt(n.textContent) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            game_board[cell.id[0]][cell.id[1]] = parseInt(n.textContent);
        } else {
            game_board[cell.id[0]][cell.id[1]] = 0;
        }
    }
})) 


// Event listener that allows the user to fill a cell using the keyboard
document.onkeypress = function (e) {
    // Get the cell with the selected-cell class
    let selected_cell = document.querySelector(".selected-cell");

    // Check that the user has selected a cell
    if (selected_cell !== null) {
        // If so, check if the key press is an integer between 0-9
        // Ignore all other key presses
        if (parseInt(e.key) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {

            // Check if the user's selection for the cell is valid
            let res = check_selection(selected_cell, parseInt(e.key));
            
            // If not, add the 'incorrect' class to the cell -- this highlights the cell in red
            if (!res) {
                selected_cell.classList.add("incorrect");
            } 
            // Otherwise, remove the 'incorrect' class from the cell
            else {
                selected_cell.classList.remove("incorrect");
            }

            // Zero empties the cell
            if (parseInt(e.key) === 0) {
                selected_cell.textContent = "";
            } else {
                // All other integers fill in the cell
                selected_cell.textContent = e.key;
            }
            // Update the game board
            game_board[selected_cell.id[0]][selected_cell.id[1]] = parseInt(e.key)
        }
    }
}

// Event listener for the submit button
document.querySelector(".btn").addEventListener("click", () => {
    // Check the user's attempt
    let res = check_game_solution();

    if (res) {
        // Correct solution
        document.querySelector(".submit-msg").textContent = "Solution is correct! You win!";
    } else {
        // Incorrect solution
        document.querySelector(".submit-msg").textContent = "Sorry! Please try again!"
    }
});
