const mongoose = require('mongoose');

const OsobaSchema = mongoose.Schema({
    id_osoby: {
        type: Number,
        required: true
    },
    id_grupy: {
        type: Number
    },
    login: {
        type: String,
        required: true
    },
    haslo: {
        type: String,
        required: true
    },
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    ksywka: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefon: {
        type: Number,
        required: true
    },
    czyUczestnik: {
        type: Boolean,
        required: true
    },
    czyTrener: {
        type: Boolean,
        required: true
    },
    czyAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Osoba', OsobaSchema);