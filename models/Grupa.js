const mongoose = require('mongoose');

const GrupaSchema = mongoose.Schema({
    id_grupy: {
        type: Number,
        required: true
    },
    nazwa: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Grupa', GrupaSchema);