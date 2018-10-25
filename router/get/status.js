const users = require("../../users");
const adapter = require("../../eosbattleshipdemux/utils/adapter");


const status = (req,res) => {

    let username = req.query.username;
    if(!username)
    {
        return res.status(400).json({
            success : false,
            err : "Username is undefined."
        });
    }

    if(adapter.usedAccounts[username] !== undefined)
    {
        return res.status(200).json({
            success : true,
            payload : 2
        });
    }
    else if(users.includes(username))
    {
        return res.status(200).json({
            success : true,
            payload : 1
        });
    }
    else
    {
        return res.status(200).json({
            success : true,
            payload : 0
        });
    }

};

module.exports = status;