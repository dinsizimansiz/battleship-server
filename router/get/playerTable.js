const {getUser} = require("../../eosbattleshipdemux/utils");
const {table} = require("printers");

const playerTable = async (req,res) => {

    let userid = req.body.userid;
    const dbConnection = app.get("dbConnection")();
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