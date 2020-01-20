const mongoose = require('mongoose');

const Trening_klasycznySchema = mongoose.Schema({
    id_trening: {
        type: Number,
        required: true
    },
    id_trener: {
        type: Number,
        required: true
    },
    id_grupa: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    godzina_rozpoczecia: {
        type: String,
        required: true
    },
    godzina_zakonczenia: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trening_klasyczny', Trening_klasycznySchema);