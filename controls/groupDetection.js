// Helper functions used by boardcontrol.js to add/remove/update entries in
// the game's groupTable.  

/**
 * Return a hash table of { board_index : state } corresponding to the 
 * 4 liberties surrounding a single stone in the game of go. 
 */
function getLibertyTable(co) {
    var index = getIndex(co); 
    var liberties = {};

    // The 4 liberties surrounding the point, by index
    var indices = { 
        right: index + 1,
        left: index - 1,
        up: index - board.size,
        down: index + board.size
    }

    // Append the values of the liberties to hash table
    Object.values(indices).forEach(function(index) {
        state = board.state[index];
        liberties[index] = state;
    });

    return liberties;
}

/**
 * Analyse 4 liberties for just-played stone and determine how an existing
 * group table should be updated based on liberty state configuration. 
 * e.g. updateGroupTable("B8") 
 */
function updateGroupTable(co) {
    // Get a 1D array, libStates, holding every liberty's state (0, 1, or 2) 
    // Get colour of just-played stone 
    var libTable = getLibertyTable(co);
    var libStates = Object.values(libTable);
    var stoneColour = board.stoneColour(co);

    // Case 1: No liberties occupied by a same-coloured stone
    // Stone establishes new group
    if (countOf(libStates, boardstates[stoneColour]) == 0) {
        groupTable.addEntry(stoneColour, co);
    
    // Case 2: At least 1 liberty is occupied by a same-coloured stone
    // All touching stones are merged into a single group
    } else if (countOf(libStates, boardstates[stoneColour]) > 0) {

        // Get an array holding coordinates of the same-coloured stones
        var indices = Object.keys(libTable);
        var coords = [];
        for (let i = 0; i < indices.length; i++) {
            if (libStates[i] == boardstates[stoneColour]) {
                coords.push(getCoordinate(indices[i]));
            }
        }

        // Return union of all arrays that same-coloured stones are members of
        var union = [];
        for (let i = 0; i < coords.length; i++) {
            var groupId = groupTable.getGroupOf(coords[i]);
            var arr = groupTable.table[groupId][0];
            for (let j = 0; j < arr.length; j++) {
                var newPoint = arr[j];
                if (!(union.includes(newPoint))) {
                    union.push(newPoint);
                }
            }
        }
        
        // Add the last-played stone to the union
        union.push(co);

        // Delete old groups
        for (let i = 0; i < coords.length; i++) {
            var groupId = groupTable.getGroupOf(coords[i]);
            groupTable.deleteEntry(groupId);
        }

        // Add all coordinates in union to a new, merged group
        groupTable.addEntry(stoneColour, co);
        var groupId = groupTable.getGroupOf(co);
        groupTable.table[groupId][0] = union;

    }

}
