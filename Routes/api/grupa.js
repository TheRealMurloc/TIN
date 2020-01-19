const express = require('express');
const router = express.Router();

const grupa = require('../../Table/Grupa')

let nextId = 3;

function getGrupaById(id) {
    return grupa.find(element => element.id_grupy == id);
}

router.get('/a_lista_grup', (req, res) => res.render('administrator/a_lista_grup',
    {
        who: 'Administrator',
        grupa: grupa,
        user: req.session.user
    }));

router.get('/a_zmiana_grupy/:id', (req, res) => res.render('../views/administrator/a_zmiana_grupy',
    {
        who: 'Administrator',
        grupa: grupa,
        tmpElement: getGrupaById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_dodaj_grupe', (req, res) => res.render('../views/administrator/a_dodaj_grupe',
    {
        who: 'Administrator',
        grupa: grupa,
        user: req.session.user
    }));

// Create
router.post('/', (req, res) => {
    const newGrupa = {
        id_grupy: nextId++,
        nazwa: req.body.nazwa,
    }

    if(!newGrupa.nazwa) {
        res.status(400).json({ msg: 'Wpisz nazwę'});
    } else {
        grupa.push(newGrupa);
    }
    //res.json(grupa);
    res.redirect('../api/grupa/a_lista_grup');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<grupa.length; i++)
    {
        if(grupa[i].id_grupy === parseInt(req.params.id))
        {
            grupa[i].nazwa = req.body.nazwa;
        }
    }
    res.redirect('../../grupa/a_lista_grup');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<grupa.length; i++)
    {
        if(grupa[i].id_grupy === parseInt(req.params.id))
        {
           grupa.splice(i, 1);
        }
    }
    res.redirect('../../grupa/a_lista_grup');
});

module.exports = router;
