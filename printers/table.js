const {convertToIndex} = require("../eosbattleshipdemux/utils");

const printTable = (table) => {

    let retLines = ["   "+[0,1,2,3,4,5,6,7,8,9].join(" ")];


    for(var y = 0; i < 10;y++)
    {
        var lineString = i.toString() + ;

        for(var x = 0; x < 10;x++)
        {
            lineString += " " + table[convertToIndex(x,y)];
        }
        retLines.push(lineString)
    }

    return retLines.join("\n") + "\n";
};

module.exports = printTable;