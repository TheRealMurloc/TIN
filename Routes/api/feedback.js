const express = require('express');
const router = express.Router();

const feedback = require('../../Table/Feedback')

let nextId = 2;


router.get('/a_lista_feedback', (req, res) => res.render('administrator/a_lista_feedback',
    {
        who: 'Administrator',
        feedback: feedback,
        user: req.session.user
    }));

router.get('/t_feedback', (req, res) => res.render('trener/t_feedback',
    {
        who: 'Trener',
        feedback: feedback,
        user: req.session.user
    }));

router.get('/u_feedback', (req, res) => res.render('uczestnik/u_feedback',
    {
        who: 'Uczestnik',
        feedback: feedback,
        user: req.session.user
    }));

// Create
router.post('/', (req, res) => {
    const newFeedback = {
        id_feedback: nextId++,
        opis: req.body.feedback
    }

    if(!newFeedback.opis) {
        res.status(400).json({ msg: 'Wpisz opis'});
    } else {
        feedback.push(newFeedback);
    }
    res.redirect('../api/feedback/a_lista_feedback');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.params.id))
        {
            cwiczenia.splice(i, 1);
        }
    }
    res.redirect('../../cwiczenia/a_lista_cwiczen');
});


module.exports = router;