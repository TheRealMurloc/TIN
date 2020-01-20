const express = require('express');
const router = express.Router();

const Obecnosc = require('../../models/Obecnosc');

// Update admin
router.post('/administrator/:id/:trening', async (req, res) => {

    let lista;
    try {
        lista = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }

    let nieobecny = true;
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_uczestnik === parseInt(req.params.id) && lista[i].id_trening === parseInt(req.params.trening))
        {
            try{
                const usunietaObecnosc = await Obecnosc.deleteOne({id_uczestnik: parseInt(req.params.id), id_trening: parseInt(req.params.trening)})
            }catch(err){
                res.json({message:err});
            }
            nieobecny = false;
        }
    }
    if(nieobecny)
    {
        const newObecnosc = new Obecnosc({
            id_trening: parseInt(req.params.trening),
            id_uczestnik: parseInt(req.params.id)
        });
        try{
            const savedObecnosc = await newObecnosc.save();
        } catch (err) {
            res.json({ message: err });
        }
    }
    let page = '/api/trening_klasyczny/a_lista_obecnosci/';
    page += parseInt(req.params.trening);

    res.redirect(page);
});

//Update trener
router.post('/trener/:id/:trening', async (req, res) => {

    let lista;
    try {
        lista = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }

    let nieobecny = true;
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_uczestnik === parseInt(req.params.id) && lista[i].id_trening === parseInt(req.params.trening))
        {
            try{
                const usunietaObecnosc = await Obecnosc.deleteOne({id_uczestnik: parseInt(req.params.id), id_trening: parseInt(req.params.trening)})
            }catch(err){
                res.json({message:err});
            }
            nieobecny = false;
        }
    }
    if(nieobecny)
    {
        const newObecnosc = new Obecnosc({
            id_trening: parseInt(req.params.trening),
            id_uczestnik: parseInt(req.params.id)
        });
        try{
            const savedObecnosc = await newObecnosc.save();
        } catch (err) {
            res.json({ message: err });
        }
    }
    let page = '/api/trening_klasyczny/t_lista_obecnosci/';
    page += parseInt(req.params.trening);

    res.redirect(page);
});

module.exports = router;