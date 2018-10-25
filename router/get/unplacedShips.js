const printers = require("../../printers");
const {getUser} = require("../../eosbattleshipdemux/utils");
const adapter = require("../../eosbattleshipdemux/utils/adapter");
const {MongoClient} = require("mongodb");

const unplacedShips = async (req, res) => {

    let username = req.query.username;
    var userid = adapter.usedAccounts[username].accountName;
    if(adapter.usedAccounts[username] === undefined)
    {
        res.status(400).json({
            success : false,
            err : "User is not in a game."
        });
    }


    try
    {
        MongoClient("mongodb://localhost:27017").connect(function(err,dbObject) {
            if(err)
            {
                return res.status(400).json({
                    success : false,
                    err : err
                });
            }
            let dbConnection = dbObject.db("battleship");
            var game = dbConnection.collection("games").findOne({$or : [{"host.userid": userid},{"challenger.userid" : userid }]});
            var user = getUser(game,gameid);
            const ships = printers.placedShips(user.playerTable);
            return res.status(200).json({
               success : true,
               payload : ships
            });
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