const express = require('express');
const router = express.Router();
const cwiczenia = require('../../Table/Cwiczenia');

let nextId = 3;

// Gets All
router.get('/', (req, res) => {
    res.json(cwiczenia);
});

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
        opis: req.body.opis
    }

    if(!newCwiczenie.nazwa) {
        res.status(400).json({ msg: 'Wpisz nazwę'});
    } else {
        cwiczenia.push(newCwiczenie);
    }
    res.redirect('/administrator/a_dodaj_grupe.html');
});

// Update
router.put('/:id', (req, res) => {
    const found = cwiczenia.some(cwiczenia => cwiczenia.id_cwiczenia === parseInt(req.params.id));

    if(found){
        const updateCwiczenia = req.body;
        cwiczenia.forEach(cwiczenia => {
            if(cwiczenia.id_cwiczenia === parseInt(req.params.id)){
                cwiczenia.nazwa = updateCwiczenia.nazwa ? updateCwiczenia.nazwa : cwiczenia.nazwa;
                cwiczenia.opis = updateCwiczenia.opis ? updateCwiczenia.opis : cwiczenia.opis;

                res.json({ msg: 'Cwiczenie zaktualizowane', cwiczenia});
            }
        });
    } else {
        res.status(400).json({ msg: `Nie ma cwiczenia o id ${req.params.id}` })
    }
});

// Delete
router.delete('/:id', (req, res) => {
    const found = cwiczenia.some(cwiczenia => cwiczenia.id_cwiczenia === parseInt(req.params.id));

    if(found) {
        res.json({ msg: 'Cwiczenie usunięta', Cwiczenia: cwiczenia.filter(cwiczenia => cwiczenia.id_cwiczenia !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `Nie znaleziono cwiczenia o id ${req.params.id}` })
    }
});


module.exports = router;