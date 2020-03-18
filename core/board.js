// Used to create game coordinate IDs for SVG nodes in board tree
const alphabet = [
    "A","B","C","D","E","F","G","H","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

// Each item in Board.state can be 0, 1, or 2 (see Board below)
const boardstatesInv = {
    0: "empty",
    1: "black",
    2: "white"
};

const boardstates = {
    "empty": 0,
    "black": 1,
    "white": 2
};

/** Initialises board model with field variables:
 *      - size: 9x9, 13x13, 19x19
 *      - state: (size*size) array holding board representation, where
 *              > 0 = empty, 1 = black, 2 = white
 */
class Board {

    constructor(size) {
        this.size = size;
        this.state = this.initBoardMatrix();
    }

    /** Initialises 1D array of length (size * size) */
    initBoardMatrix() {
        var m = [];
        for (let i = 0; i < (this.size * this.size); i++) {
            m.push(0);
        }    
        return m;
    } 

    /** 
     * Update Board.state with latest played stone. Coordinates are 
     * translated into indices for board model (e.g. "B9" = 1). 
     */
    playStone(colour, co) {
        this.state[getIndex(co)] = boardstates[colour]; 
    }

    /**
     * Clear a space in board - set item in board.state to 0 = "empty"
     */
    setEmpty(co) {
        this.state[getIndex(co)] = 0;
    }

    /**
     * Get colour of stone ("empty", "black", or "white").
     */
    stoneColour(co) {
        return boardstatesInv[this.state[getIndex(co)]];
    }

}

/** 
 * Convert from a game-world coordinate to the index of a 1D array.
 */
function getIndex(coordinate) {
    var x = alphabet.indexOf(coordinate[0]),
        y = board.size * (board.size - coordinate.slice(1));
    return x + y;
}

/** 
 * Convert from index of a 1D array to a game-world coordinate.
 */
function getCoordinate(index) {
    var x = 0,          // x and y parts of coordinate
        y = 0;          // x refers to index of alphabet 
    
    while ((index % board.size) != 0) {
        x++; index--;
    }

    while (index != 0) {
        y++; index = index - board.size;
    }

    return `${alphabet[x]}${board.size - y}`;
}
