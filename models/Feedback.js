const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    id_feedback: {
        type: Number,
        required: true
    },
    id_osoby: {
        type: Number,
        required: true
    },
    opis: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);