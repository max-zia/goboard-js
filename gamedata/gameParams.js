// Manages storage/manipulation of game parameters
// Parameters include: 
//      main tree of moves
//      error message (stores messages for invalid moves)
//
class GameParams {

    constructor() {
        this.mainTree = [];
        this.errorMsg = ''; 
    }
        
    getPlayer() {
        return (this.mainTree.length % 2) == 0 ? "black" : "white";
    }

}
