const mongoose = require('mongoose');

const Service = mongoose.model(
    "Service",
    new mongoose.Schema({
        name: String,
        status: Boolean,
    })
);

module.exports = Service;