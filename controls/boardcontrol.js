/** Loop over each board intersection and add listeners/control */
function initBoardControl() { 
    for (let i = 0; i < board.size; i++) {
        for (let j = 1; j < (board.size + 1); j++) {
            var co = alphabet[i] + j.toString(); 
            addControl(co);
        }
    }
}

/** List of listeners to add to view */
function addControl(co) {
    var coordinate = document.getElementById(co); 
    var x = coordinate.children[0].getAttribute("cx");
    var y = coordinate.children[0].getAttribute("cy"); 
    
    var g = createSVGElement("g");
    g.setAttribute("id", "control-group");
    coordinate.appendChild(g);

    // Append a control/sensor to control-group
    var r = Math.floor(stoneR / 2);
    var svgCircle = createSVGCircle(
        x, y, r, 
        "transparent", 
        "transparent", 
        "listener"
    );
    g.appendChild(svgCircle);

    // Initialise listener
    addBoardClickHandler(svgCircle, co);
}

/**
 * Attach a click listener to a point on the board, which handles clicks as
 * either moves to be stored in main tree, or analysis moves for a secondary tree.  
 */
function addBoardClickHandler(svg, co) {
    svg.addEventListener("click", function() {
        
        // ANALYSIS MODE OFF - move is stored in params.mainTree
        if (!(analysisMode.isOn)) {

            // Get player colours
            var colour = params.getPlayer();
            var oppColour = (colour == "white") ? "black" : "white";

            // Update board model
            board.playStone(colour, co);

            // Update group table
            updateGroupTable(co);

            // Contact with opposite-coloured stones
            if (touchesOppColour(oppColour, co)) {
                captureCheck(oppColour, co, board);
            }

            // Update view by refreshing latest move
            view.refreshPoint(co, board);

            // Update mainTree
            params.mainTree.push(co); 
        

        // ANALYSIS MODE ON - move is stored in analysisMode.secondaryLine
        } else {
            
            // Already in a secondary line?
            if (!(analysisMode.inSecondaryLine)) {
                // No? Set flag to true and reset storage arr for secondary line
                analysisMode.inSecondaryLine = true;
                analysisMode.secondaryLine = [];
            }

            // Get player colours
            var colour = analysisMode.getPlayer();
            var oppColour = (colour == "white") ? "black" : "white";

            // Push a move to board, refresh, and secondary line
            // Update board model
            board.playStone(colour, co);

            // Update group table
            updateGroupTable(co);

            // Contact with opposite-coloured stones
            if (touchesOppColour(oppColour, co)) {
                captureCheck(oppColour, co, board);
            }

            // Update view by refreshing latest move
            view.refreshPoint(co, board);

            // Update mainTree
            analysisMode.secondaryLine.push(co); 
        }

    });

}

/**
 * Add an event listener to the back button and the left arrow keypress 
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
        
                // delete from group
                groupTable.removefromGroup(co);
        
                // set empty
                board.setEmpty(co);
        
                // refresh view
                view.refreshPoint(co, board);
            }

        }

    });

    // one for keypresses (left arrow)
}


/**
 * Add an event listener to the forward button and right arrow keypress
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

                    // Update board model
                    board.playStone(colour, co);

                    // Update group table
                    updateGroupTable(co);
            
                    // Contact with opposite-coloured stones
                    if (touchesOppColour(oppColour, co)) {
                        captureCheck(oppColour, co, board);
                    }
            
                    // Update view by refreshing latest move
                    view.refreshPoint(co, board);

                }
            }
        }

    });

    // one for keypresses (right arrow)
    // do something here
}


/**
 * Add an event listener to the "return to game" button, which resets board and
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

