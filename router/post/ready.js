const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");
var adapter = require("../../eosbattleshipdemux/utils/adapter");
var {TextDecoder,TextEncoder} = require("text-encoding");

const ready = async (req,res) => {

    let username = req.query.username;
    if(!username)
    {
        return res.status(400).json({
            success : false,
            err : "Username is undefined."
        });
    }

    if(adapter.usedAccounts[username] === undefined)
    {
        return res.status(400).json({
            success : false,
            err : "Player is not in a match."
        });
    }
    const userid = adapter.usedAccounts[username].accountName;
    const privateKey = adapter.usedAccounts[username].privateKey;
    const shipName = req.query.shipname;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc("http://127.0.0.1:8888", {fetch});
    const api = new Api({rpc,signatureProvider,textDecoder:new TextDecoder(),textEncoder:new TextEncoder()});
    try
    {
        await api.transact({
            actions : [{
                account : "battleship",
                name : "ready",
                authorization : [{
                    actor : userid,
                    permission : "active"
                }],
                data : {
                    player : userid
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });

        return res.status(201).json({
            success : true
        });
    }
    catch(err)
    {
        return res.status(400).json({
            success : false,
            error : err
        })
    }
};

module.exports = ready;