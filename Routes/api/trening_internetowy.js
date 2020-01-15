const express = require('express');
const router = express.Router();

const trening_internetowy = require('../../Table/Trening_internetowy')



let nextId = 3;

function getTreningById(id) {
    return trening_internetowy.find(element => element.id_trening == id);
}

router.get('/a_lista_treningow_internetowych', (req, res) => res.render('administrator/a_lista_treningow_internetowych',
    {
        who: 'Administrator',
        trening_internetowy: trening_internetowy,
        user: req.session.user
    }));

router.get('/a_zmiana_daty_treningu_internetowego/:id', (req, res) => res.render('../views/administrator/a_zmiana_daty_treningu_internetowego',
    {
        who: 'Administrator',
        trening_internetowy: trening_internetowy,
        tmpElement: getTreningById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_trening_internetowy', (req, res) => res.render('administrator/a_trening_internetowy',
    {
        who: 'Administrator',
        trening_internetowy: trening_internetowy,
        user: req.session.user
    }));

// Create
router.post('/', (req, res) => {
    const newTrening = {
        id_trening: nextId++,
        dataOd: req.body.startDate,
        dataDo: req.body.finishDate
    }

    trening_internetowy.push(newTrening);
    res.redirect('../api/trening_internetowy/a_lista_treningow_internetowych');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<trening_internetowy.length; i++)
    {
        if(trening_internetowy[i].id_trening === parseInt(req.params.id))
        {
            trening_internetowy[i].dataOd = req.body.startDate;
            trening_internetowy[i].dataDo = req.body.finishDate;
        }
    }
    res.redirect('../../trening_internetowy/a_lista_treningow_internetowych');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<trening_internetowy.length; i++)
    {
        if(trening_internetowy[i].id_trening === parseInt(req.params.id))
        {
            trening_internetowy.splice(i, 1);
        }
    }
    res.redirect('../../trening_internetowy/a_lista_treningow_internetowych');
});


module.exports = router;