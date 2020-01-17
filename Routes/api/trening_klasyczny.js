const express = require('express');
const router = express.Router();

const trening_klasyczny = require('../../Table/Trening_klasyczny');
const grupa = require('../../Table/Grupa');
const trener = require('../../Table/Trener');

let nextId = 2;

function getTreningById(id) {
    return trening_klasyczny.find(element => element.id_trening == id);
}

router.get('/u_kalendarz_zajec', (req, res) => {

    lista = [];
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_grupa === parseInt(req.session.user.id_grupa))
        {
            lista.push(trening_klasyczny[i]);
        }
    }


    res.render('uczestnik/u_kalendarz_zajec',
    {
        who: 'Uczestnik',
        trening_klasyczny: lista,
        user: req.session.user
    })
});

router.get('/a_lista_treningow_klasycznych', (req, res) => res.render('administrator/a_lista_treningow_klasycznych',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        user: req.session.user
    }));

router.get('/a_zmiana_treningu_klasycznego/:id', (req, res) => res.render('../views/administrator/a_zmiana_treningu_klasycznego',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        grupa: grupa,
        trener: trener,
        tmpElement: getTreningById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_trening_klasyczny', (req, res) => res.render('administrator/a_trening_klasyczny',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        grupa: grupa,
        trener: trener,
        user: req.session.user
    }));


// Gets All
router.get('/', (req, res) => {
    res.json(grupa);
});

// Get single
router.get('/:id', (req, res) => {
    const found = grupa.some(grupa => grupa.id_grupy === parseInt(req.params.id));

    if(found){
        res.json(grupa.filter(grupa => grupa.id_grupy === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});

// Create
router.post('/', (req, res) => {
    const newTrening = {
        id_trening: nextId++,
        godzina: req.body.godzina,
        data: req.body.data,
        id_grupa: req.body.grupa,
        id_trener: req.body.trener
    }

    trening_klasyczny.push(newTrening);
    res.redirect('../api/trening_klasyczny/a_lista_treningow_klasycznych');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === parseInt(req.params.id))
        {
            trening_klasyczny[i].data = req.body.data;
            trening_klasyczny[i].godzina = req.body.godzina;
            trening_klasyczny[i].id_grupa = req.body.grupa;
            trening_klasyczny[i].id_trener = req.body.trener;
        }
    }
    res.redirect('../../trening_internetowy/a_lista_treningow_internetowych');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === parseInt(req.params.id))
        {
            trening_klasyczny.splice(i, 1);
        }
    }
    res.redirect('../../trening_klasyczny/a_lista_treningow_klasycznych');
});

module.exports = router;