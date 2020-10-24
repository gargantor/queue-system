const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require("dotenv").config();

const db = {};

db.mongoose = mongoose;

db.letsGo = () => {
    mongoose
    .connect(`mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        db.initial();
    })
    .catch(err => {
        console.log("Connection error", err);
        process.exit();
        
    })
    mongoose.connection.once('open', function(){
        console.log("MongoDB database connection established successfully");    
    })
    
    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection open");    
    });
    
    
    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection error" + err);    
    });
    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection disconnected");    
    });
    
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

}

db.user = require("./user.model");
db.role = require("./role.model");
db.ticket = require("./ticket.model");
db.counter = require("./counter.model");
db.service = require("./service.model");
db.sequence_ticket = require("./sequenceTicket.model");

db.ROLES = ["user", "admin", "moderator"];

db.initial = () => {
    createNewRole();
    createNewCounter();
    createNewService();
    createNewSequence();    
}

createNewRole = () => {    
    const Role = db.role;
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            console.log("create new role");
            new Role({
                name: "user"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("add 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("add 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("add 'admin' to roles collection");
            });
        }
    });
}

createNewCounter = () => {
    const Counter = db.counter;
    Counter.estimatedDocumentCount((err, count) =>{
        if(!err && count === 0){
            console.log("create new service");
            new Counter({
                name: "default counter",
                counter_code: 1
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("Add counter '1' to counter collection");
            });

        }
    });
}

createNewService = () => {
    const Service = db.service;
    Service.estimatedDocumentCount((err, count) =>{
        if(!err && count === 0){
            console.log("create new counter");
            new Service({
                name: "Customer Service",
                status: 1
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("Add 'Customer Service' to service collection");
            });

        }
    });
}

createNewSequence = () => {
    const Sequence = db.sequence_ticket;
    Sequence.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            console.log("create new sequence");
            new Sequence({
                sequence_value: 0
            }).save(err => {
                if(err){
                    console.log("error ", err);
                }

                console.log("add default sequence ticket value");
            });
        }
    });
}

module.exports = db;