const path = require('path');
const fs = require('fs');
require("dotenv").config();
const fsPromise = fs.promises;
const audioFolder = path.join(__basedir, process.env.AUDIO_FOLDER);

const db = require('../models')
const Ticket = db.ticket;

exports.getTicket = (req, res) => {
    Ticket.findOne({_id:req.body.id})
    .populate("counter", "counter_code")
    .exec((err, ticket) => {            
        if(!ticket) {
            return res.status(404).send({ message: "Ticket not found"});
        } 
        if(err) {
            console.log(err);
            res.status(500).send({ message: err});
            return;
        }
        res.status(200).send(ticket);            
    })
}

exports.getAudio = async(req, res) => {
    var listAudio = [];
    var files;
    try {
        files = await audioFiles(audioFolder);
        if (files === undefined) {
            console.log("undefined");
            res.send("no audio file");
        } else {
            files.forEach(file => {
                var split = file.split('.');
                var ID = split[0];
                var link = `${req.protocol}://${req.headers.host}/assets/audio/${file}`;
                listAudio.push({
                    link: link,
                    file: file,
                    ID: ID
                })
            });
            res.send(listAudio);
        }
        
    } catch (error) {
        console.log("error", error); 
        res.send("error no audio file");           
    }
}
function audioFiles(path){
    return fsPromise.readdir(path)
}