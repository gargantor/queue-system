const path = require('path');
require("dotenv").config();
const fs = require('fs');
const fsPromise = fs.promises;
const directoryPath = path.join(__dirname, '/');
const audioFolder = path.join(__basedir, process.env.AUDIO_FOLDER);

const controller = require('../controllers/monitor.controller');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/monitor/get-ticket', controller.getTicket);
    app.get('/api/monitor/getaudio', controller.getAudio); 
    
    function audioFiles(path){
        return fsPromise.readdir(path)
    }
    
}