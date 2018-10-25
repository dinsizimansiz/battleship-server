var users = require("../../users");
var adapter = require("../../eosbattleshipdemux/utils/adapter");

const dequeue = async (req,res) => {

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
        return res.status(400).json({
            success : false,
            err : "User is already in a match."
        });
    }

    if(users[0] === username)
    {
        users.pop();
        return res.status(201).json({
           success : true,
           payload : "Dequeued."
        });
    }
    else
    {
        return res.status(400).json({
           success : false,
           err : "Player not in the queue."
        });
    }
};

module.exports = dequeue;