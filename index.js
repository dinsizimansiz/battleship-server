const BATTLESHIP_PORT = 5050;

var router = require("./router");

var app = require("express")();
app.use(router);
app.set("dbconnection",dbConnection);


var server = require("http").Server(app);
server.listen(BATTLESHIP_PORT);

var {actionWatcher,dbConnection} = require("./eosbattleshipdemux");

var io = require("./eosbattleshipdemux/utils/io");
io.connect(server);
io.set("players",{});

io.on("connection",function(socket){

    console.log(socket);
});


actionWatcher.watch();