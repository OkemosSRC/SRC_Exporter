const crypto = require("crypto");
const fs = require("fs");


function hash_password(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function validate_password(password, hash) {
    return hash === hash_password(password);
}

function generate_token() {
    return crypto.randomBytes(70).toString("hex");
}

function verify_token_from_file(token) {
    const tokens = fs.readFileSync('./lib/hashes.txt').toString().split('\n');
    const hashed = hash_password(token);
    return tokens.includes(hashed);
}


module.exports = {
    hash_password, validate_password, generate_token, verify_token_from_file
};
