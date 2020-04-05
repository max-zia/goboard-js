/**
 * Add handlers for the UI elements of the dashboard, including undo move,
 * go forward move, and return to game.
 */
function initDashControl() {
    undoMoveHandler();
    forwardMoveHandler();
    returnToGameHandler();
}

/**
 * Add an event listener for the back button and the left arrow keypress 
 */
function undoMoveHandler() {
    
    // one for clicking on button in GUI
    var btn = document.getElementById("back-btn");
    btn.addEventListener("click", function() {

        if (params.mainTree.length != 0) {

            if (
                (analysisMode.counter >= 0) 
                || (analysisMode.inSecondaryLine) 
                || !(analysisMode.isOn)
            ) {
                
                var path1 = false;
        
                if (!(analysisMode.isOn)) {
                    analysisMode.enable(groupTable, params, board, dashview);
                    path1 = true;
                } else {
                    if (!(analysisMode.inSecondaryLine)) {
                        path1 = true;
                    } else {
                        if (analysisMode.secondaryLine.length == 0) {
                            path1 = true;
                            analysisMode.inSecondaryLine = false;
                        } else {
                            var co = analysisMode.secondaryLine.pop();
                            if (analysisMode.secondaryLine.length == 0) {
                                analysisMode.inSecondaryLine = false;
                            }
                        }
                    }
                }
        
                if (path1) {
                    var co = params.mainTree[analysisMode.counter];
                    analysisMode.counter--;
                }
        
                // delete from group, set empty, and refresh view
                groupTable.removefromGroup(co);
                board.setEmpty(co);
                view.refreshPoint(co, board);
            }

        }

    });

    // add event listener for left arrow keypress
}


/**
 * Add an event listener for the forward button and right arrow keypress
 */
function forwardMoveHandler() {
    // one for clicking on button in GUI
    var btn = document.getElementById("forward-btn");
    btn.addEventListener("click", function() {

        if (analysisMode.isOn) {
            if (!(analysisMode.inSecondaryLine)) {
                if (analysisMode.counter != (params.mainTree.length - 1)) {

                    analysisMode.counter++;
                    var colour = (analysisMode.counter % 2) == 0 ? "black" : "white";
                    var oppColour = (colour == "white") ? "black" : "white";
                    var co = params.mainTree[analysisMode.counter];
                    placeMove(board, colour, oppColour, co);

                }
            }
        }

    });

    // add event listener for right arrow keypress
}


/**
 * Add an event listener for the "return to game" button, which resets board and
 * group table to latest state, disables analysis mode, and refreshes view.
 */
function returnToGameHandler() {

    var btn = document.getElementById("return-to-game-btn");
    btn.addEventListener("click", function() {

        analysisMode.disable();

        // reset board and group table to latest state
        board.state = analysisMode.mainBoard.state;
        groupTable.table = analysisMode.mainGroupTable.table;
        groupTable.total = analysisMode.mainGroupTable.total;
        groupTable.groupId = analysisMode.mainGroupTable.groupId;

        view.refreshWholeBoard(board);
        
    });

}

