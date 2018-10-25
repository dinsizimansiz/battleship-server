const printers = require("../../printers");
const {getUser} = require("../../eosbattleshipdemux/utils");
const {MongoClient} = require("mongodb");
const adapter = require("../../eosbattleshipdemux/utils/adapter");

isTurn = async (req,res) => {

    const username = req.query.username;
    if(username === undefined)
    {
        return res.status(400).json({
            success : false,
            err : "Username is not specified"
        });
    }

    if(adapter.usedAccounts[username] === undefined)
    {
        return res.status(400).json({
            success : false,
            err : "User is not in a game."
        });
    }
    const userid = adapter.usedAccounts[username].accountName;
    MongoClient("mongodb://localhost:27017").connect(function(err,dbObject) {
        if(err)
        {
            return res.status(400).json({
                success : false,
                err : err
            });
        }
        let dbConnection = dbObject.db("battleship");
        dbConnection.collection("games").findOne({$or : [{"host.userid": userid},{"challenger.userid" : userid }]})
            .then((game) =>{
                if(game == null)
                {
                    return res.status(400).json({
                        success : false,
                        payload : "Game is not found."
                    });
                }
                if(game.started === false)
                {
                    return res.status(200).json({
                        success : false,
                        payload : "Game is not started yet."
                    });
                }
                if(game.host.userid === userid)
                {
                    if(game.round %2)
                    {
                        return res.status(200).json({
                           success: true,
                           payload : false
                        });
                    }
                    else
                    {
                        return res.status(200).json({
                            success : true,
                            payload : true
                        });
                    }
                }
                else
                {
                    if(game.round % 2)
                    {
                        return res.status(200).json({
                           success : true,
                           payload : true
                        });
                    }
                    else
                    {
                        return res.status(200).json({
                           success : true,
                           payload : false
                        });
                    }
                }
            });
    });
};

module.exports = isTurn;