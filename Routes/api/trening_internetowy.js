const express = require('express');
const router = express.Router();

const Trening_internetowy = require('../../models/Trening_internetowy');

router.get('/a_lista_treningow_internetowych', async (req, res) => {
    let trening_internetowy = [];
    let lista;
    try {
        lista = await Trening_internetowy.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trening: lista[i].id_trening,
            dataOd: lista[i].dataOd,
            dataDo: lista[i].dataDo
        };
        trening_internetowy.push(tmp);
    }
    res.render('administrator/a_lista_treningow_internetowych',
        {
            who: 'Administrator',
            trening_internetowy: trening_internetowy,
            user: req.session.user
        });
});

router.get('/a_zmiana_daty_treningu_internetowego/:id', async (req, res) =>
{
    let lista;
    let tmp = null;
    try {
        lista = await Trening_internetowy.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_trening === parseInt(req.params.id))
        {
            tmp = {
                id_trening: lista[i].id_trening,
                dataOd: lista[i].dataOd,
                dataDo: lista[i].dataDo
            };
        }
    }
    res.render('../views/administrator/a_zmiana_daty_treningu_internetowego',
        {
            who: 'Administrator',
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_trening_internetowy', (req, res) => res.render('administrator/a_trening_internetowy',
    {
        who: 'Administrator',
        user: req.session.user
    }));

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Trening_internetowy.find();
    } catch (err) {
        res.json({message: err});
    }
    const newTrening_internetowy = new Trening_internetowy({
        id_trening: nextId.length+1,
        dataOd: req.body.startDate,
        dataDo: req.body.finishDate
    });
    try{
        const savednewTrening_internetowy = await newTrening_internetowy.save();
    } catch (err) {
        res.json({ message: err });
    }
    res.redirect('../api/trening_internetowy/a_lista_treningow_internetowych');
});

// Update
router.post('/update/:id', async (req, res) => {
    try{
        const updatedTrening_internetowy = await Trening_internetowy.updateOne(
            {id_trening: req.params.id},
            {$set: {dataOd: req.body.startDate,
                    dataOd: req.body.finishDate}
            });
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../trening_internetowy/a_lista_treningow_internetowych');
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunieteCwiczenie = await Cwiczenia.deleteOne({id_trening: req.params.id})
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../trening_internetowy/a_lista_treningow_internetowych');
});


module.exports = router;