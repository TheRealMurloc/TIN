const express = require('express');
const router = express.Router();

let nextId = 3;

const grupa = [
    {
        id_grupy: 1,
        nazwa: "grupa pierwsza"
    },
    {
        id_grupy: 2,
        nazwa: "grupa druga"
    }
];

function getGrupaById(id) {
    for( let i=0; i<=grupa.length; i++)
    {
        if(grupa.id_grupy === id)
            return grupa.indexOf(i);
    }
    // grupa.forEach(element => {
    //     if(element.id_grupy === id){
    //         return element;
    //     }
    // });
}

router.get('/a_lista_grup', (req, res) => res.render('../views/administrator/a_lista_grup',
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
    let id = parseInt(req.params.id);
    tmpElement = this.getGrupaById(id);
    res.json(tmpElement);
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
        res.status(400).json({ msg: `Nie ma grupy o id ${req.params.id}` })
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