const { Api, JsonRpc, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");
var adapter = require("../../eosbattleshipdemux/utils/adapter");
var users = require("../../users");
const {TextEncoder,TextDecoder} = require("text-encoding");


const enqueue = async (req,res) => {

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
            const privateKey = adapter.usedAccounts[host].privateKey;
            const signatureProvider = new JsSignatureProvider([privateKey]);
            const rpc = new JsonRpc("http://127.0.0.1:8888", {fetch});
            const api = new Api({rpc,signatureProvider,textDecoder:new TextDecoder(),textEncoder:new TextEncoder()});
            try {
                await api.transact({
                    actions: [{
                        account: "battleship",
                        name: "creategame",
                        authorization: [{
                            actor : adapter.usedAccounts[host].accountName,
                            permission: "active"
                        }],

                        data: {
                            host: adapter.usedAccounts[host].accountName,
                            challenger: adapter.usedAccounts[challenger].accountName
                        }
                    }]
                }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                });

                return res.status(201).json({
                    success : true,
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