const express = require('express');
const router = express.Router();

const cwiczenia = require('../../Table/Cwiczenia')

let nextId = 3;

function getCwiczenieById(id) {
    return cwiczenia.find(element => element.id_cwiczenia == id);
}

router.get('/a_lista_cwiczen', (req, res) => res.render('administrator/a_lista_cwiczen',
    {
        who: 'Administrator',
        cwiczenia: cwiczenia,
        user: req.session.user
    }));

router.get('/t_lista_cwiczen', (req, res) => res.render('trener/t_lista_cwiczen',
    {
        who: 'Trener',
        cwiczenia: cwiczenia,
        user: req.session.user
    }));

router.get('/u_lista_cwiczen', (req, res) => res.render('uczestnik/u_lista_cwiczen',
    {
        who: 'Uczestnik',
        cwiczenia: cwiczenia,
        user: req.session.user
    }));

router.get('/a_zmiana_cwiczenia/:id', (req, res) => res.render('../views/administrator/a_zmiana_cwiczenia',
    {
        who: 'Administrator',
        cwiczenia: cwiczenia,
        tmpElement: getCwiczenieById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/t_zmiana_cwiczenia/:id', (req, res) => res.render('../views/trener/t_zmiana_cwiczenia',
    {
        who: 'Trener',
        cwiczenia: cwiczenia,
        tmpElement: getCwiczenieById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_dodaj_cwiczenie', (req, res) => res.render('administrator/a_dodaj_cwiczenie',
    {
        who: 'Administrator',
        cwiczenia: cwiczenia,
        user: req.session.user
    }));

router.get('/t_dodaj_cwiczenie', (req, res) => res.render('trener/t_dodaj_cwiczenie',
    {
        who: 'Trener',
        cwiczenia: cwiczenia,
        user: req.session.user
    }));

// Get single
router.get('/:id', (req, res) => {
    const found = cwiczenia.some(cwiczenia => cwiczenia.id_cwiczenia === parseInt(req.params.id));

    if(found){
        res.json(cwiczenia.filter(cwiczenia => cwiczenia.id_cwiczenia === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Nie ma cwiczenia o id ${req.params.id}` })
    }
});

// Create
router.post('/', (req, res) => {
    const newCwiczenie = {
        id_cwiczenia: nextId++,
        nazwa: req.body.nazwa,
        opis: req.body.opis,
    }

    if(!newCwiczenie.nazwa) {
        res.status(400).json({ msg: 'Wpisz nazwę'});
    } else {
        cwiczenia.push(newCwiczenie);
    }
    res.redirect('../api/cwiczenia/a_lista_cwiczen');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.params.id))
        {
            cwiczenia[i].nazwa = req.body.nazwa;
            cwiczenia[i].opis = req.body.opis;
        }
    }
    res.redirect('../../cwiczenia/a_lista_cwiczen');
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