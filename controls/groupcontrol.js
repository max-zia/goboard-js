// Helper functions used by boardcontrol.js to add/remove/update entries in
// the game's groupTable.  

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
    var colour = board.stoneColour(co);

    // Case 1: No liberties occupied by a same-coloured stone
    // Stone establishes new group
    if (countOf(libStates, boardstates[colour]) == 0) {
        groupTable.addEntry(colour, co);
    
    // Case 2: At least 1 liberty is occupied by a same-coloured stone
    // All touching stones are merged into a single group
    } else if (countOf(libStates, boardstates[colour]) > 0) {

        // Get an array holding coordinates of the same-coloured stones
        var indices = Object.keys(libTable);
        var coords = [];
        for (let i = 0; i < indices.length; i++) {
            if (libStates[i] == boardstates[colour]) {
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
        groupTable.addEntry(colour, co);
        var groupId = groupTable.getGroupOf(co);
        groupTable.table[groupId][0] = union;

    }

}
