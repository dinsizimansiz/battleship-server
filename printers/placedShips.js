const {getShipName} = require("../eosbattleshipdemux/utils");

const placedShips = (playerTable) =>{

    let availableShips = {
        "0" : true,
        "1" : false,
        "2" : false,
        "3" : false,
        "4" : false,
        "5" : false
    };
    let placedShips = [];

    playerTable.forEach(function(item){
        if(!availableShips[item])
        {
            availableShips[item] = true;
        }
    });

    for(var i = 1; i < 6; i++)
    {
        if(availableShips[i.toString()])
        {
            placedShips.push(getShipName(i.toString()));
        }
    }

    return placedShips.join("\n") + "\n";
};

module.exports = placedShips;