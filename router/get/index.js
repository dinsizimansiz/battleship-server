const enemyTable = require("./enemyTable");
const getFreeShips = require("./unplacedShips");
const getPlacedShips =  require("./remainingShips");
const getOpponentGuesses = require("./opponentGuesses");
const playerTable = require("./playerTable");


module.exports = {
    enemyTable,
    getPlacedShips,
    playerTable,
    getFreeShips,
    getOpponentGuesses
};