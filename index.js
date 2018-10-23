const BATTLESHIP_PORT = 5050;
const bodyParser = require("body-parser");
var router = require("./router");

var app = require("express")();
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var server = require("http").Server(app);
server.listen(BATTLESHIP_PORT);

var {actionWatcher} = require("./eosbattleshipdemux");

var io = require("./eosbattleshipdemux/utils/io");
io.connect(server);




actionWatcher.watch();