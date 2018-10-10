const index = {
    "sum":require("../innerFunction/math.js").sum,
    "multiply":require("../innerFunction/math.js").multiply,
    "yuan_to_fen":require("../innerFunction/money.js").yuan_to_fen,
    "stringappend":require("../innerFunction/string.js").stringappend,
    "time":require("../innerFunction/time.js").time,
    "const":require("../innerFunction/util.js").const
};
module.exports = index;