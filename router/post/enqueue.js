const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch");


const enqueue = async (req,res) => {

    const userid = req.body.username;
    const privateKey = req.body.privateKey;
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const rpc = new JsonRpc("http://127.0.0.1:8000", {fetch});
    const api = new Api({rpc,signatureProvider});
    try
    {
        await api.transact({
            actions : [{
                account : "battleship",
                name : "enqueue",
                authorization : [{
                    actor : userid,
                    permission : "active"
                }],
                data : {
                    player : userid
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

module.exports = enqueue;