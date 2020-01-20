const mongoose = require('mongoose');

const Trening_internetowySchema = mongoose.Schema({
    id_trening: {
        type: Number,
        required: true
    },
    dataOd: {
        type: String,
        required: true
    },
    dataDo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trening_internetowy', Trening_internetowySchema);