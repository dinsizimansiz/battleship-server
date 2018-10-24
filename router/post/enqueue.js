const { Api, JsonRpc, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");
var adapter = require("../../eosbattleshipdemux/utils/adapter");
var users = require("users");

const enqueue = async (req,res) => {

    const username  = req.body.username;
    if(adapter.usedAccounts[username] !== undefined)
    {
        res.status(400).json({
            success : false,
            err : "User is already in a match."
        });
    }
    if(users.includes(username) )
    {
        return res.status(400).json({
            success : false,
            err : "User is already in queue."
        });
    }
    else
    {
        users.push(username);
        if(users.length === 2)
        {
            let host = users[0];
            let challenger = users[1];
            adapter.usedAccounts[host] = adapter.freeAccounts.pop();
            adapter.usedAccounts[challenger] = adapter.freeAccounts.pop();
            const privateKey = "5Ji8xWXDdDou18VtbEfmBqJVxooMNz38vemm6srFHqwy1PpaskR";
            const signatureProvider = new JsSignatureProvider([privateKey]);
            const rpc = new JsonRpc("http://127.0.0.1:8000", {fetch});
            const api = new Api({rpc,signatureProvider});
            try {
                await api.transact({
                    actions: [{
                        account: "battleship",
                        name: "creategame",
                        authorization: [{
                            actor: "battleship",
                            permission: "active"
                        }],
                        data: {
                            host: adapter.usedAccounts[host].accountName,
                            challenger: adapter.usedAccounts[challenger].accountName
                        }
                    }]
                });

                return res.status(201).json({
                    success : false,
                    payload : "Game started."
                });
            }
            catch(err)
            {
                return res.status(400).json({
                    success : false,
                    error : err
                });
            }
        }
        else
        {
            return res.status(201).json({
                success : true,
                payload : "Enqueued."
            })
        }
    }
};

module.exports = enqueue;