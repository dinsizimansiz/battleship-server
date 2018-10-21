const printers = require("printers");
const {getUser} = require("../../eosbattleshipdemux/utils");

const remainingShips = async (req, res) => {

    const userid = req.body.userid;
    try
    {
        var dbConnection = app.get("dbConnection");
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