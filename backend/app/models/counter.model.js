const mongoose = require('mongoose');

const Counter = mongoose.model(
    "Counter",
    new mongoose.Schema({
        counter_code: {
            type: Number,
            unique: true
        },
        name: String,
        status: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            }
        ],

    })
);

module.exports = Counter;