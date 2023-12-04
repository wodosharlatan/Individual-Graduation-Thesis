const SHA256 = require("crypto-js/sha256");


function GenerateHash() {

const random = Math.ceil(Math.random() * 10000).toString();
return SHA256(random).toString();

}

module.exports = GenerateHash;
