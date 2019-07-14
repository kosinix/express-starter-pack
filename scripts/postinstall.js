// Generate credentials.json

//// Core modules
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

//// External modules

//// Modules


const APP_DIR = path.resolve(path.join(__dirname, '../')).replace(/\\/g, '/')

/**
 * 
 * @param {Number} length 
 * @returns {String} Hex string
 */
const hex = (length=20) => {
    return crypto.randomBytes(length).toString('hex').substring(0, length)
}

let credentialsJson = `{
    "app": {
        "secret": "${hex()}"
    },
    "session": {
        "secret": "${hex()}"
    }
}`
fs.writeFile(path.join(APP_DIR, "credentials.json"), credentialsJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Created credentials.json");
}); 