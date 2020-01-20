const mongoose = require('mongoose');

const UczestnikSchema = mongoose.Schema({
    id_uczestnik: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Uczestnik', UczestnikSchema);