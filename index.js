const app = require("express")();
const {actionWatcher,dbConnection} = require("./eosbattleshipdemux");
const router = require("./router");

const BATTLESHIP_PORT = 5050;


app.use(router);
app.set("dbconnection",dbConnection);


actionWatcher.watch();
app.listen(BATTLESHIP_PORT);