const path = require("path");
const fs = require("fs");
const p = path.resolve(__dirname, "contract", "lottery.sol");
const solc = require("solc");
const source = fs.readFileSync(p, "utf-8");

module.exports = d = solc.compile(source, 1).contracts[":Lottery"];
console.log(d);