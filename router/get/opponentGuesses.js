const {getOpponent} = require("../../eosbattleshipdemux/utils");
const {table} = require("../../printers");

const opponentGuesses = async (req,res) => {

    let userid = req.body.userid;
    const dbConnection = app.get("dbConnection")();
    try
    {
        var game = await dbConnection.collection("games").findOne({$or : [{host : {userid : userid}},{challenger : {userid : userid}}]});
        var opponent = getOpponent(game,userid);
        const table = table(opponent.enemyTable);
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

module.exports = opponentGuesses;