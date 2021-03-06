const {getShipName} = require("../eosbattleshipdemux/utils");

const remainingShips = (playerTable) =>{

    let availableShips = {
        "0" : true,
        "1" : false,
        "2" : false,
        "3" : false,
        "4" : false,
        "5" : false
    };
    let remainingShips = [];

    playerTable.forEach(function(item){
        if(!availableShips[item])
        {
            availableShips[item] = true;
        }
    });

    for(var i = 1; i < 6; i++)
    {
        if(!availableShips[i.toString()])
        {
            remainingShips.push(getShipName(i.toString()));
        }
    }

    return remainingShips.join("\n") + "\n";
};

module.exports = remainingShips;