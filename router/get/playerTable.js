const {getUser} = require("../../eosbattleshipdemux/utils");
const {table} = require("../../printers");
const {MongoClient} = require("mongodb");
const adapter = require("../../eosbattleshipdemux/utils/adapter");


const playerTable = async (req,res) => {

    let username = req.body.username;
    var userid = adapter.usedAccounts[username].accountName;
    var dbConnection ;
    MongoClient().connect("mongodb://localhost:27017",function(err,dbObject) {
        dbConnection = dbObject.db("battleship")
    });
    try
    {
        var game = await dbConnection.collection("games").findOne({$or : [{host : {userid : userid}},{challenger : {userid : userid}}]});
        var user = getUser(game,userid);
        const table = table(user.playerTable);
        return res.status(200).json({
            success : true,
            payload : table
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