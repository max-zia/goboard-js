// Storage of all the game data needed to enable analysis mode functionality.
// For example, storage of secondary move sequence trees to allow user to
// try different combinations of moves.

class AnalysisMode {

    constructor() {
        this.mainBoard = {};
        this.mainGroupTable = {};
        this.isOn = false;
        this.counter = 0;
    }

    backupMainBoard(board) {
        var clone = board.copy();
        this.mainBoard = clone;
    }

    backupMainGroupTable(groupTable) {
        var clone = groupTable.copy();
        this.mainGroupTable = clone;
    }

    enable(groupTable, params) {
        this.counter = params.mainTree.length - 1;
        this.isOn = true;
        this.backupMainGroupTable(groupTable);
    }

}