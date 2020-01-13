const express = require('express');
const router = express.Router();

const osoba = require('../../Table/Osoba')
const grupa = require('../../Table/Grupa')

let nextId = 3;

function getOsobaById(id) {
    return osoba.find(element => element.id_osoby == id);
}

router.get('/a_lista_osob', (req, res) => res.render('administrator/a_lista_osob',
    {
        who: 'Administrator',
        osoba: osoba
    }));

router.get('/a_zmiana_osoby/:id', (req, res) => res.render('administrator/a_zmiana_osoby',
    {
        who: 'Administrator',
        osoba: osoba,
        tmpElement: getOsobaById(parseInt(req.params.id))
    }));

router.get('/a_przydziel_grupy', (req, res) => res.render('administrator/a_przydziel_grupy',
    {
        who: 'Administrator',
        osoba: osoba,
        grupa: grupa
    }));



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
        ksywka: req.body.ksywka,
        email: req.body.email,
        telefon: req.body.telefon
    }

    if(!newOsoba.login) {
        res.status(400).json({ msg: 'Wpisz login'});
        nextId--;
    } else {
        osoba.push(newOsoba);
    }
    res.redirect('/administrator/a_dodaj_uczestnika.html');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<osoba.length; i++)
    {
        if(osoba[i].id_osoby === parseInt(req.params.id))
        {
            osoba[i].login = req.body.login ? req.body.login : osoba[i].login;
            osoba[i].haslo = req.body.haslo ? req.body.haslo : osoba[i].haslo;
            osoba[i].ksywka = req.body.ksywka ? req.body.ksywka : osoba[i].ksywka;
            osoba[i].email = req.body.email ? req.body.email :  osoba[i].email;
            osoba[i].telefon = req.body.telefon ? req.body.telefon : osoba[i].telefon;
        }
    }
    res.redirect('../../osoba/a_lista_osob');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<osoba.length; i++)
    {
        if(osoba[i].id_osoby === parseInt(req.params.id))
        {
            osoba.splice(i, 1);
        }
    }
    res.redirect('../../osoba/a_lista_osob');
});


module.exports = router;