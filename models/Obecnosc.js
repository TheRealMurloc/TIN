const mongoose = require('mongoose');

const ObecnoscSchema = mongoose.Schema({
    id_trening: {
        type: Number,
        required: true
    },
    id_uczestnik: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Obecnosc', ObecnoscSchema);