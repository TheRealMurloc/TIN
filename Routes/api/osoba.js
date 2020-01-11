const express = require('express');
const router = express.Router();
const osoba = require('../../Table/Osoba');

let nextId = 3;

// Gets All
router.get('/', (req, res) => {
    res.json(osoba);
});

// Get single
router.get('/:id', (req, res) => {
    const found = osoba.some(osoba => osoba.id_osoby === parseInt(req.params.id));

    if(found){
        res.json(osoba.filter(osoba => osoba.id_osoby === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});

// Create
router.post('/', (req, res) => {
    const newOsoba = {
        id_osoby: nextId++,
        login: req.body.login,
        haslo: req.body.haslo,
        ksywka: 'ksywka',
        email: 'email',
        telefon: '123456789'
    }

    if(!newOsoba.login) {
        res.status(400).json({ msg: 'Wpisz login'});
        nextId--;
    } else {
        osoba.push(newOsoba);
    }
    //res.json(osoba);
    res.redirect('/administrator/a_dodaj_uczestnika.html');
});

// Update
router.put('/:id', (req, res) => {
    const found = osoba.some(osoba => osoba.id_osoby === parseInt(req.params.id));

    if(found){
        const updateOsoba = req.body;
        osoba.forEach(osoba => {
            if(osoba.id_osoby === parseInt(req.params.id)){
                osoba.login = updateOsoba.login ? updateOsoba.login : osoba.login;
                osoba.haslo = updateOsoba.haslo ? updateOsoba.haslo : osoba.haslo;
                osoba.ksywka = updateOsoba.ksywka ? updateOsoba.ksywka : osoba.ksywka;
                osoba.email = updateOsoba.email ? updateOsoba.email : osoba.email;
                osoba.telefon = updateOsoba.telefon ? updateOsoba.telefon : osoba.telefon;

                res.json({ msg: 'Osoba zaktualizowana', osoba});
            }
        });
    } else {
        res.status(400).json({ msg: `Nie ma osoby o id ${req.params.id_osoby}` })
    }
});

// Delete
router.delete('/:id', (req, res) => {
    const found = osoba.some(osoba => osoba.id_osoby === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Osoba usunięta', Osoby: osoba.filter(osoba => osoba.id_osoby !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `Nie znaleziono osoby o id ${req.params.id}` })
    }
});


module.exports = router;