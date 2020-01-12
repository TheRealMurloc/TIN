const express = require('express');
const router = express.Router();



const grupa = [
    {
        id_grupy: 1,
        nazwa: "Grupa pierwsza"
    },
    {
        id_grupy: 2,
        nazwa: "Grupa druga"
    }
];

let nextId = 3;

function getGrupaById(id) {
    return grupa.find(element => element.id_grupy == id);
}

router.get('/a_lista_grup', (req, res) => res.render('administrator/a_lista_grup',
    {
        who: 'Administrator',
        grupa: grupa
    }));

router.get('/a_zmiana_grupy/:id', (req, res) => res.render('../views/administrator/a_zmiana_grupy',
    {
        who: 'Administrator',
        grupa: grupa,
        tmpElement: getGrupaById(parseInt(req.params.id))
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
    res.redirect('../views/administrator/a_zmiana_grupy');
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
    res.redirect('/administrator/a_dodaj_grupe.html');
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