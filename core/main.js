// Instantiate board, board/dash view tools, and main group table
var board = new Board(9);
var view = new BoardView();
var dashview = new DashView();
var groupTable = new GroupTable();

// Instantiate game parameters, as well as analysis mode data
var params = new GameParams(); 
var analysisMode = new AnalysisMode();

// Initialise and draw the board's SVG structure
view.initDraw(board);

// Add controls/listeners to the SVG board 
initBoardControl();

// Add controls/listeners to the UI
initDashControl();

