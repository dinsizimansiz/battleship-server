const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");
const adapter = require("../../eosbattleshipdemux/utils/adapter");

const makeMove = async (req,res) => {

    let username = req.body.username;
    if(adapter.usedAccounts[username] === undefined)
    {
        return res.status(400).json({
            success : false,
            err : "Player is not in a match."
        });
    }
    const userid = adapter.usedAccounts[username].accountName;
    const privateKey = adapter.usedAccounts[username].privateKey;
    const x = req.body.x;
    const y = req.body.y;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc("http://127.0.0.1:8000", {fetch});
    const api = new Api({rpc,signatureProvider});
    try
    {
        await api.transact({
            actions : [{
                account : "battleship",
                name : "makemove",
                authorization : [{
                    actor : userid,
                    permission : "active"
                }],
                data : {
                    player : userid,
                    x : x,
                    y : y
                }
            }]
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

module.exports = makeMove;