/**
 * Initiates a sequence of function and method calls to add stone to board model,
 * to add a new coordinate to the group table, to check for captures/contact after
 * placing a new move, and to refresh the board view after playing move.    
 */
function placeMove(board, colour, oppColour, co) {
    board.playStone(colour, co);
    updateGroupTable(co);
    if (touchesOppColour(oppColour, co)) {
        captureCheck(oppColour, co, board);
    }
    view.refreshPoint(co, board);
}

/**
 * Returns false and updates errorMsg in params if move would lead to suicide or ko. 
 */
function moveIsValid(params, colour, oppColour, co) {
    var libTable = getLibertyTable(co);
    var libStates = Object.values(libTable);
    var totalLiberties = libStates.length;

    // Check for suicide
    if (countOf(libStates, boardstates[oppColour]) == totalLiberties) {
        params.errorMsg = `Illegal move - ${colour} at ${co} is suicide`; 
        return false;
    } else {
        return true;
    }

}

/** Count the number of liberties of a particular group */
function countLiberties(groupId) {
    liberties = [];
    var groupCoords = groupTable.table[groupId][0];
    groupCoords.forEach(function(co) {
        var libTable = getLibertyTable(co);
        var libIndices = Object.keys(libTable);

        for (let i = 0; i < Object.keys(libTable).length; i++) {
            var index = libIndices[i];
            if (libTable[index] == 0) {
                if (!(liberties.includes(index))) {
                    liberties.push(index);
                }
            }
        }
    });
    return liberties.length;
}

/**
 * Return a hash table of { board_index : state } corresponding to the 
 * liberties surrounding a single stone in the game of go. 
 */
function getLibertyTable(co) {
    var index = getIndex(co); 
    var liberties = {};
    var indices = {};

    // Identify the liberties surrounding the point, by index
    // If the stone is on an edge or in the corner, then it may have fewer
    // liberties by 4 than default
    if (index == 0) {
        indices["right"] = index + 1;
        indices["down"] = index + board.size;
    } else {
        if ((index + 1) % 9 != 0) {
            indices["right"] = index + 1; 
        }
        if (index % 9 != 0) {
            indices["left"] = index - 1;
        }
        if (!(index - board.size < 0)) {
            indices["up"] = index - board.size;
        }
        if (!(index + board.size > (board.size * board.size))) {
            indices["down"] = index + board.size;
        }
    }

    // Append the values of the liberties to hash table
    // i.e. What stones, if any, are occupying these liberty spots?
    Object.values(indices).forEach(function(index) {
        state = board.state[index];
        liberties[index] = state;
    });

    return liberties;
}
