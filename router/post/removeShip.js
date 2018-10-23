const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");


const removeShip = async (req,res) => {

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
    const shipName = req.body.shipName;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc("http://127.0.0.1:8000", {fetch});
    const api = new Api({rpc,signatureProvider});
    try
    {
        await api.transact({
            actions : [{
                account : "battleship",
                name : "removeship",
                authorization : [{
                    actor : userid,
                    permission : "active"
                }],
                data : {
                    player : userid,
                    shipname : shipName
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

module.exports = removeShip;