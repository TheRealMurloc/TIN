const express = require('express');
const router = express.Router();

const Grupa = require('../../models/Grupa');

router.get('/a_lista_grup', async (req, res) => {
    let grupa = [];
    let lista;
    try {
        lista = await Grupa.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_grupy: lista[i].id_grupy,
            nazwa: lista[i].nazwa
        };
        grupa.push(tmp);
    }
    res.render('administrator/a_lista_grup',
        {
            who: 'Administrator',
            grupa: grupa,
            user: req.session.user
        });
});

router.get('/a_zmiana_grupy/:id', async (req, res) =>
{
    let lista;
    let tmp = null;
    try {
        lista = await Grupa.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_grupy === parseInt(req.params.id))
        {
            tmp = {
                id_grupy: lista[i].id_grupy,
                nazwa: lista[i].nazwa
            };
        }
    }
    res.render('../views/administrator/a_zmiana_grupy',
        {
            who: 'Administrator',
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_dodaj_grupe', (req, res) => res.render('../views/administrator/a_dodaj_grupe',
    {
        who: 'Administrator',
        user: req.session.user
    }));

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Grupa.find();
    } catch (err) {
        res.json({message: err});
    }
    const newGrupa = new Grupa({
        id_grupy: nextId.length+1,
        nazwa: req.body.nazwa
    });
    try{
        const savedGrupa = await newGrupa.save();
    } catch (err) {
        res.json({ message: err });
    }
    res.redirect('../api/grupa/a_lista_grup');
});

// Update
router.post('/update/:id', async (req, res) => {
    try{
        const updatedGrupa = await Grupa.updateOne(
            {id_grupy: req.params.id},
            {$set: {nazwa: req.body.nazwa}
            });
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../grupa/a_lista_grup');
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunietaGrupa = await Grupa.deleteOne({id_grupy: req.params.id})
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../grupa/a_lista_grup');
});


module.exports = router;
