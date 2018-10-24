const printers = require("../../printers");
const {getUser} = require("../../eosbattleshipdemux/utils");
const {MongoClient} = require("mongodb");
const adapter = require("../../eosbattleshipdemux/utils/adapter");


const remainingShips = async (req, res) => {

    let username = req.body.username;
    var userid = adapter.usedAccounts[username].accountName;
    var dbConnection ;
    if(adapter.usedAccounts[username] === undefined)
    {
        res.status(400).json({
            success : false,
            err : "User is not in a game."
        });
    }
    MongoClient().connect("mongodb://localhost:27017",function(err,dbObject) {
        if(err)
        {
            return res.status.json({
                success : false,
                err : err
            });
        }
        dbConnection = dbObject.db("battleship")
    });

    try
    {
        var game = await dbConnection.collection("games").findOne({$or : [{host : {userid : userid}},{challenger : { userid : userid }}]});
        var user = getUser(game,gameid);
        const ships = printers.remainingShips(user.playerTable);
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

module.exports = remainingShips;