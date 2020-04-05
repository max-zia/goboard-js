/**
 * Return true if the stone just placed is next to a stone of opposite colour. 
 */
function touchesOppColour(oppColour, co) {
    var libTable = getLibertyTable(co);

    if (Object.values(libTable).includes(boardstates[oppColour])) {
        return true;
    }
}

/**
 * Analyse 4 liberties for just-played stone - address opposite-coloured stones.
 */
function captureCheck(oppColour, co, board) {
    var libTable = getLibertyTable(co);
    var libIndices = Object.keys(libTable);

    for (let i = 0; i < 4; i++) {
        var index = libIndices[i];

        // If the liberty is occupied by a stone of the opposite colour
        if (libTable[index] == boardstates[oppColour]) {

            // Find the group ID of the opposite coloured stone's parent group
            var group = groupTable.getGroupOf(getCoordinate(index));
            
            // Case 1: Capture of a group
            // If the group has no liberties remaining, remove it from board
            if (countLiberties(group) == 0) {
                // Iterate through each element in group, set the coordinate to
                // empty in the board model, and refresh the view for that point
                coordinates = groupTable.table[group][0];
                for (let i = 0; i < coordinates.length; i++) {
                    board.setEmpty(coordinates[i]);
                    view.refreshPoint(coordinates[i], board);
                }
            }
        } 

    }
}
