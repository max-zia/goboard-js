var board = new Board(9);
var view = new BoardView();

// Initialise and draw the board's SVG structure
view.initDraw(board);

// Add controls/listeners to the SVG 
initBoardControl();

// 

