const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");
var adapter = require("../../eosbattleshipdemux/utils/adapter");
var {TextDecoder,TextEncoder} = require("text-encoding");

const placeShip = async (req,res) => {

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
    const direction = req.query.direction;
    const shipName = req.query.shipname;
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc("http://127.0.0.1:8888", {fetch});
    const api = new Api({rpc,signatureProvider,textDecoder:new TextDecoder(),textEncoder:new TextEncoder()});
    try
    {
        await api.transact({
            actions : [{
                account : "battleship",
                name : "placeship",
                authorization : [{
                    actor : userid,
                    permission : "active"
                }],
                data : {
                    player : userid,
                    shipname : shipName,
                    x : x,
                    y : y,
                    direction : direction
                }
            }]},{
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

module.exports = placeShip;