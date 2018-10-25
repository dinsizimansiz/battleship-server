var router = require("express").Router();
var getMethods = require("./get");
var postMethods = require("./post");

router.get("/enemytable",getMethods.enemyTable);
router.get("/placedships",getMethods.getPlacedShips);
router.get("/freeships",getMethods.getFreeShips);
router.get("/playertable",getMethods.playerTable);
router.get("/opponentguesses",getMethods.getOpponentGuesses);
router.get("/status",getMethods.status);
router.post("/dequeue",postMethods.dequeue);
router.post("/enqueue",postMethods.enqueue);
router.post("/makesove",postMethods.makeMove);
router.post("/placeship",postMethods.placeShip);
router.post("/ready",postMethods.ready);
router.post("/removeship",postMethods.removeShip);
router.post("/unready",postMethods.unready);

module.exports = router;