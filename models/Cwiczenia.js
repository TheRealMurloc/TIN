const mongoose = require('mongoose');

const CwiczenieSchema = mongoose.Schema({
    id_cwiczenia: {
        type: Number,
        required: true
    },
    nazwa: {
        type: String,
        required: true
    },
    opis: String
});

module.exports = mongoose.model('Cwiczenia', CwiczenieSchema);