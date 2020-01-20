const express = require('express');
const router = express.Router();

const Feedback = require('../../models/Feedback');

router.get('/a_lista_feedback', async (req, res) => {
    let feedback = [];
    let lista;
    try {
        lista = await Feedback.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_feedback: lista[i].id_feedback,
            id_osoby: lista[i].id_osoby,
            opis: lista[i].opis
        };
        feedback.push(tmp);
    }
    res.render('administrator/a_lista_feedback',
        {
            who: 'Administrator',
            feedback: feedback,
            user: req.session.user
        });
});

router.get('/t_feedback', (req, res) => res.render('trener/t_feedback',
    {
        who: 'Trener',
        user: req.session.user
    }));

router.get('/u_feedback', (req, res) => res.render('uczestnik/u_feedback',
    {
        who: 'Uczestnik',
        user: req.session.user
    }));

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Feedback.find();
    } catch (err) {
        res.json({message: err});
    }
    const newFeedback = new Feedback({
        id_feedback: nextId.length+1,
        id_osoby: parseInt(req.session.user.id_osoby),
        opis: req.body.feedback
    });
    try{
        const savedFeedback = await newFeedback.save();
    } catch (err) {
        res.json({ message: err });
    }
    if(!newFeedback.opis) {
        res.status(400).json({ msg: 'Wpisz opis'});
    } else {
        feedback.push(newFeedback);
    }
    if(req.session.user.czyAdmin)
        res.redirect('../api/feedback/a_lista_feedback');
    if(req.session.user.czyTrener)
        res.redirect('../api/feedback/t_feedback');
    if(req.session.user.czyUczestnik)
        res.redirect('../api/feedback/u_feedback');
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunietyFeedback = await Feedback.deleteOne({id_feedback: req.params.id})
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../feedback/a_lista_feedback');
});


module.exports = router;