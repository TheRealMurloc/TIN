const mongoose = require('mongoose');

const zlecone_cwiczenieSchema = mongoose.Schema({
    id_osoba: {
        type: Number,
        required: true
    },
    id_cwiczenia: {
        type: Number,
        required: true
    },
    nazwa: {
        type: String,
        required: true
    },
    id_trening: {
        type: Number,
        required: true
    },
    ilosc_serii: {
        type: Number,
        required: true
    },
    ilosc_zaplanowana: {
        type: Number,
        required: true
    },
    ilosc_ogolem: {
        type: Number,
        required: true
    },
    ilosc_zrobiona: {
        type: Number,
        required: true
    },
    wynik: {
        type: String,
        required: true
    },
    cwiczenie_grupowe: {
        type: Boolean,
        required: true
    },

});

module.exports = mongoose.model('zlecone_cwiczenie', zlecone_cwiczenieSchema);