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
 * Attach a click event listener to some SVG element in DOM 
 */
function addBoardClickHandler(svg, co) {
    svg.addEventListener("click", function() {

        if (!(analysisMode.isOn)) {

            // Get player colours
            var colour = params.getPlayer();
            var oppColour = (colour == "white") ? "black" : "white";
            console.log(colour, co);

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
        
        } else {
            var colour = params.getPlayer();
            var oppColour = (colour == "white") ? "black" : "white";
            console.log(colour, co);
        }

    });

}

/**
 * Add a click event listener to the back button and the left arrow keypress 
 */
function addUndoMoveHandler() {
    
    // one for clicking on button in GUI
    var btn = document.getElementById("back-btn");
    btn.addEventListener("click", function() {

        // Is analysis mode already on?
        if (analysisMode.isOn == false) {
            analysisMode.enable(groupTable, params);
        } else {
            analysisMode.counter--;
        }

        // delete from group
        var co = params.mainTree[analysisMode.counter];
        groupTable.removefromGroup(co);

        // set empty
        board.setEmpty(co);

        // refresh view
        view.refreshPoint(co, board);
    });

    // one for keypresses (left arrow)
}