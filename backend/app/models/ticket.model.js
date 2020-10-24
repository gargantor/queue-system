const mongoose = require('mongoose');

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        ticket_number: String,
        status: {
            type: String,
            default: "waiting"
        },
        counter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Counter"            
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        },
        timeDone: Date

    }, {timestamps:true})
);

module.exports = Ticket;