const {getUser} = require("../../eosbattleshipdemux/utils");
const {table} = require("../../printers");
const {MongoClient} = require("mongodb");
const adapter = require("../../eosbattleshipdemux/utils/adapter");


const playerTable = async (req,res) => {

    let username = req.query.username;
    if(!username)
    {
        return res.status(400).json({
            success : false,
            err : "Username is undefined."
        });
    }
    if(adapter.usedAccounts[username] === undefined)
    {
        return res.status(400).json({
            success : false,
            err : "User is not in a game."
        });
    }
    var userid = adapter.usedAccounts[username].accountName;


    try
    {
        MongoClient("mongodb://localhost:27017").connect(function(err,dbObject) {
            if(err)
            {
                return res.status.json({
                    success : false,
                    err : err
                });
            }
            let dbConnection = dbObject.db("battleship")
            var game = dbConnection.collection("games").findOne({$or : [{"host.userid": userid},{"challenger.userid" : userid}]});
            var user = getUser(game,userid);
            const enemyTable = table(user.enemyTable);
            return res.status(200).json({
                success : true,
                payload : enemyTable
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

module.exports = playerTable;