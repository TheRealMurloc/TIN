const express = require('express');
const router = express.Router();
const grupa = require('../../Table/Grupa');

let nextId = 3;

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
        res.status(400).json({ msg: `Nie ma grupy o id ${req.params.id}` })
    }
});

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
    res.redirect('/administrator/a_dodaj_grupe.html');
});

// Update
router.put('/:id', (req, res) => {
    const found = grupa.some(grupa => grupa.id_grupy === parseInt(req.params.id));

    if(found){
        const updateGrupa = req.body;
        grupa.forEach(grupa => {
            if(grupa.id_grupy === parseInt(req.params.id)){
                grupa.nazwa = updateGrupa.nazwa ? updateGrupa.nazwa : grupa.nazwa;

                res.json({ msg: 'Grupa zaktualizowana', grupa});
            }
        });
    } else {
        res.status(400).json({ msg: `Nie ma grupy o id ${req.params.id_osoby}` })
    }
});

// Delete
router.delete('/:id', (req, res) => {
    const found = grupa.some(grupa => grupa.id_grupy === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Grupa usunięta', Grupy: grupa.filter(grupa => grupa.id_grupy !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `Nie znaleziono grupy o id ${req.params.id}` })
    }
});


module.exports = router;