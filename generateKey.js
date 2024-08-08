const crypto = require('crypto');

function generateKey(){
    return crypto.randomBytes(32).toString('hex');
}

console.log("JWT_SECTRE_KEY:",generateKey());
console.log("JWT_ANOTHER_SECTRE_KEY:",generateKey());