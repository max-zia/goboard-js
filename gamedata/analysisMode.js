// Storage of all the game data needed to enable analysis mode functionality.
// For example, storage of secondary move sequence trees to allow user to
// try different combinations of moves.

class AnalysisMode {

    constructor() {
        this.isOn = false;
        this.counter = 0;
        
        this.secondaryLine = [];
        this.inSecondaryLine = false;
        
        this.mainGroupTable = {};
        this.mainBoard = {};
    }

    backupMainBoard(board) {
        var clone = board.copy();
        this.mainBoard = clone;
    }

    backupMainGroupTable(groupTable) {
        var clone = groupTable.copy();
        this.mainGroupTable = clone;
    }

    enable(groupTable, params, board, dashview) {
        this.counter = params.mainTree.length - 1;
        this.isOn = true;
        this.backupMainGroupTable(groupTable);
        this.backupMainBoard(board);
        dashview.enableAnalysisMode();
    }

    disable() {
        this.isOn = false;
        this.secondaryLine = [];
        this.inSecondaryLine = false;
        dashview.disableAnalysisMode();
    }

    getPlayer() {
        var x = this.counter + this.secondaryLine.length + 1;
        return (x % 2) == 0 ? "black" : "white";
    }

}
