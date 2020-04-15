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
    var htmlEl = document.getElementById(co); 
    var x = htmlEl.children[0].getAttribute("cx");
    var y = htmlEl.children[0].getAttribute("cy"); 
    
    var g = createSVGElement("g");
    g.setAttribute("id", "control-group");
    htmlEl.appendChild(g);

    // Append an SVG shape to control-group
    var r = Math.floor(stoneR / 2);
    var svg = createSVGCircle(
        x, y, r, "transparent", 
        "transparent", "listener"
    );
    g.appendChild(svg);

    // Add listener to SVG shape
    boardClickHandler(svg, co);
}

/**
 * Handle a board click at a specific point on the board. The click is either
 * registered as a move to be stored permanently in params.mainTree, or as an
 * analysis move to be temporarily stored in analysisMode.secondaryTree.
 * 
 * On clicks to the real board, this listener (i) updates the board model, 
 * (ii) updates the group table, (iii) tests any possible captures after last
 * move, (iv) refreshes board view, and (v) updates params.mainTree.
 * 
 * On clicks to the analysis board, the only difference is that, in step (v),
 * analysisMode.secondaryTree is updated rather than params.mainTree.

 */
function boardClickHandler(svg, co) {
    svg.addEventListener("click", function() {

        on = false;

        if (analysisMode.isOn) {
            on = true;
            if (!(analysisMode.inSecondaryLine)) {
                analysisMode.inSecondaryLine = true;
                analysisMode.secondaryLine = [];
            }
        }

        var colour = (on == false) ? params.getPlayer() : analysisMode.getPlayer();
        var oppColour = (colour == "white") ? "black" : "white"

        if (moveIsValid(params, colour, oppColour, co)) {
            placeMove(board, colour, oppColour, co);
            (on == false) ? params.mainTree.push(co) : analysisMode.secondaryLine.push(co); 
        } else {
            dashview.updateError(params.errorMsg);
        }

    });

}
