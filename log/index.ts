import dotenv from 'dotenv';

dotenv.config();

let logger:unknown = null;
let ENV = process.env.ENV;

if(ENV === "PROD"){
    logger = require('./ProdLogs');
} else{
    logger = require('./DevLogs');
}

module.exports = logger;
