const mongoose = require('mongoose');

const seqTickSchema = new mongoose.Schema({
    sequence_value: {
        type: Number,
        default: 0
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }
})

const sequence_ticket = mongoose.model('sequence_ticket', seqTickSchema);

module.exports = sequence_ticket;