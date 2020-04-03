// Manages storage/manipulation of game parameters
// Parameters include: 
//      scores for each player
//      sequences of previous moves, trees, move histories etc.
//
class GameParams {

    constructor() {
        this.mainTree = [];
    }
        
    getPlayer() {
        return (this.mainTree.length % 2) == 0 ? "black" : "white";
    }

}
