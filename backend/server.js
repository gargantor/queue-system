const db = require('./app/models');

db.letsGo();
global.__basedir = __dirname;

//const server = require('./theServer');

const io = require('./socketio')

