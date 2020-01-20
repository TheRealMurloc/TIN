const mongoose = require('mongoose');

const TrenerSchema = mongoose.Schema({
    id_trener: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Trener', TrenerSchema);