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
        id_osoby: parseInt(req.session.user.id_osoby),
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
    for( let i=0; i<feedback.length; i++)
    {
        if(feedback[i].id_feedback === parseInt(req.params.id))
        {
            feedback.splice(i, 1);
        }
    }
    res.redirect('../../feedback/a_lista_feedback');
});


module.exports = router;