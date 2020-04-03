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
    boardClickHandler(svgCircle, co);
}

/**
 * Attach a click listener to a point on the board, which handles clicks as
 * either moves to be stored in main tree, or analysis moves for a secondary tree.  
 */
function boardClickHandler(svg, co) {
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
