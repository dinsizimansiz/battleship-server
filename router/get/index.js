const enemyTable = require("./enemyTable");
const getFreeShips = require("./unplacedShips");
const getPlacedShips =  require("./remainingShips");
const getOpponentGuesses = require("./opponentGuesses");
const playerTable = require("./playerTable");
const status = require("./status");
const checkForTurn = require("./isTurn");
const gameStarted = require("./gameStarted");
const user = require("./user");


module.exports = {
    enemyTable,
    getPlacedShips,
    playerTable,
    getFreeShips,
    getOpponentGuesses,
    status,
    checkForTurn,
    gameStarted,
    user
};