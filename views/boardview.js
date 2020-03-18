/**
 * View tools for the go board.
 * 
 * Takes a board representation from Board class and draws a go board to the
 * browser window in HTML using SVG elements. 
 * 
 * Uses stone drawing and SVG utils from views/utils.js
 * 
 * The variables startx, starty, intersectionR, and gap are defined globally
 * in views/viewSettings.js. 
 */
class BoardView {

    /** Generate and draw initial SVG tree for board. */
    initDraw(board) {
        var rowLength = (board.size)
        for (var i = rowLength; i > 0; i--) {
            createRow(i);
            for (var j = 0; j < rowLength; j++) {
                drawIntersection(i, `${alphabet[j]}${i}`, startx, starty);
                startx += gap;
            }
            // Reset startx and adjust starty to begin new row 
            startx = startx - (gap * rowLength);
            starty += gap; 
        }
    }
    
    /* 
     * Check an item in board.state and write to SVG tree (e.g. refreshPoint("A9", Board)).  
     */
    refreshPoint(co, board) {
        // check board.state for colour and location
        var state = Number(board.state[getIndex(co)]);
        
        // check state and call corresponding function
        //      > if empty, draw or do nothing depending on state
        //      > if occupied, clear and re-draw
        if (isPointEmpty(co)) {
            if (state == 0) {
                // do nothing
            } else if (state >= 1) {
                var colour = boardstatesInv[state];
                drawStone(co, colour);
            }
        } else {
            // clear and re-draw
            clearPoint(co);
            this.refreshPoint(co, board);
        }
    }

    /**
     * Refresh every element in the board array and update the whole SVG tree. 
     */
    refreshWholeBoard(board) {
        for (let i = 0; i < (board.size * board.size); i++) {
            var co = getCoordinate(i);
            this.refreshPoint(co, board);
        }
    }
}
