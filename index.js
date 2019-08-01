// Entry point of node.js app

//// Core modules
const path = require('path');
const lodash = require('lodash');

//// First things first
//// Save full path of our root app directory and load config and credentials for convenience
global.APP_DIR = path.resolve(__dirname).replace(/\\/g, '/'); // Turn back slash to slash for cross-platform compat
global.APP_ENV = lodash.get(process, 'env.NODE_ENV', 'dev');

//// Modules
const ocinLoader = require(path.join(APP_DIR, 'src', 'ocin-config', 'index'));

// Load config and credentials
let configLoader = new ocinLoader.ConfigLoader({ 
    configName: 'config.json',
    appDir: APP_DIR,
    env: APP_ENV,
    logging: true
})
let credLoader = new ocinLoader.ConfigLoader({ 
    configName: 'credentials.json',
    appDir: APP_DIR,
    env: APP_ENV,
    logging: true
})
global.CONFIG = configLoader.getConfig();
global.CRED = credLoader.getConfig();

// console.log(CONFIG, CRED)
/**
 * Similar to require but resolves to full path
 * Usage:
 * include src/texter.js => include('src/texter')
 * include data/model/token.js => include('data/model/token')
 */
global.include = (moduleName) => {
    return require(path.join(CONFIG.app.dir, moduleName));
}

//// Create our app
let server = include('data/src/express');
server.listen(CONFIG.app.port, function () {
    console.log(`App running at "${CONFIG.app.url}", env "${APP_ENV}"`);
});
server.keepAliveTimeout = 60000 * 2;


