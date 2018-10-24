const users = require("../../users");
const adapter = require("../../eosbattleshipdemux/utils/adapter");


const status = (req,res) => {

    const username = req.body.username;
    if(adapter.usedAccounts[username] !== undefined)
    {
        return res.status(200).json({
            success : true,
            status : 2
        });
    }
    else if(users.includes(username))
    {
        return res.status(200).json({
            success : true,
            status : 1
        });
    }
    else
    {
        return res.status(200).json({
            success : true,
            status : 0
        });
    }

};

module.exports = status;