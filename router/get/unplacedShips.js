const printers = require("../../printers");
const {getUser} = require("../../eosbattleshipdemux/utils");
const adapter = require("../../eosbattleshipdemux/utils/adapter");
const {MongoClient} = require("mongodb");

const unplacedShips = async (req, res) => {

    let username = req.body.username;
    var userid = adapter.usedAccounts[username].accountName;
    var dbConnection ;
    MongoClient().connect("mongodb://localhost:27017",function(err,dbObject) {
        dbConnection = dbObject.db("battleship")
    });

    try
    {
        var dbConnection = app.get("dbConnection");
        var game = await dbConnection.collection("games").findOne({$or : [{host : {userid : userid}},{challenger : { userid : userid }}]});
        var user = getUser(game,gameid);
        const ships = printers.placedShips(user.playerTable);
        return res.status(200).json({
           success : true,
           payload : ships
        });
    }
    catch(err)
    {
        return res.status(400).json({
            success : false,
            error : err
        });
    }
};

module.exports = unplacedShips;