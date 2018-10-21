var router = require("express").Router();
var getMethods = require("./get");
var postMethods = require("./post");

router.get("/enemytable",getMethods.enemyTable);
router.get("/placedships",getMethods.getPlacedShips);
router.get("/freeships",getMethods.getFreeShips);
router.get("/playertable",getMethods.playerTable);
router.get("/opponentguesses",getMethods.getOpponentGuesses);
router.post("/dequeue",postMethods.dequeue);
router.post("/enqueue",postMethods.enqueue);
router.post("/makesove",postMethods.makeMove);
router.post("/placeship",postMethods.placeShip);
router.post("/removeship",postMethods.removeShip);

module.exports = router;