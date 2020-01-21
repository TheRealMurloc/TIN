const express = require('express');
const router = express.Router();

const Cwiczenia = require('../../models/Cwiczenia');

router.get('/a_lista_cwiczen', async (req, res) => {
    let cwiczenia = [];
    let lista;
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            opis: lista[i].opis
        };
        cwiczenia.push(tmp);
    }
    res.render('administrator/a_lista_cwiczen',
        {
            who: 'Administrator',
            cwiczenia: cwiczenia,
            user: req.session.user
        });
});

router.get('/t_lista_cwiczen', async (req, res) => {
    let cwiczenia = [];
    let lista;
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            opis: lista[i].opis
        };
        cwiczenia.push(tmp);
    }
    res.render('trener/t_lista_cwiczen',
        {
            who: 'Trener',
            cwiczenia: cwiczenia,
            user: req.session.user
        });
});

router.get('/u_lista_cwiczen', async (req, res) => {
    let cwiczenia = [];
    let lista;
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            opis: lista[i].opis
        };
        cwiczenia.push(tmp);
    }
    res.render('uczestnik/u_lista_cwiczen',
        {
            who: 'Uczestnik',
            cwiczenia: cwiczenia,
            user: req.session.user
        });
});

router.get('/a_zmiana_cwiczenia/:id', async (req, res) =>
{
    let lista;
    let tmp = null;
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_cwiczenia === parseInt(req.params.id))
        {
            tmp = {
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                opis: lista[i].opis
            };
        }
    }
    res.render('../views/administrator/a_zmiana_cwiczenia',
    {
        who: 'Administrator',
        tmpElement: tmp,
        user: req.session.user
    })
});

router.get('/t_zmiana_cwiczenia/:id', async (req, res) =>
{
    let lista;
    let tmp = null;
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].id_cwiczenia === parseInt(req.params.id))
        {
            tmp = {
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                opis: lista[i].opis
            };
        }
    }
    res.render('../views/trener/t_zmiana_cwiczenia',
        {
            who: 'Trener',
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_dodaj_cwiczenie', (req, res) => res.render('administrator/a_dodaj_cwiczenie',
    {
        who: 'Administrator',
        user: req.session.user
    }));

router.get('/t_dodaj_cwiczenie', (req, res) => res.render('trener/t_dodaj_cwiczenie',
    {
        who: 'Trener',
        user: req.session.user
    }));

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    const newCwiczenie = new Cwiczenia({
        id_cwiczenia: nextId.length+1,
        nazwa: req.body.nazwa,
        opis: req.body.opis
    });
    try{
        const savedCwiczenie = await newCwiczenie.save();
    } catch (err) {
        res.json({ message: err });
    }
    if(req.session.user.czyAdmin) {
        res.redirect('../api/cwiczenia/a_lista_cwiczen');
    }
    if(req.session.user.czyTrener) {
        res.redirect('../api/cwiczenia/t_lista_cwiczen');
    }
});

// Update
router.post('/update/:id', async (req, res) => {
    try{
        const updatedCwiczenie = await Cwiczenia.updateOne(
            {id_cwiczenia: parseInt(req.params.id)},
            {$set: {nazwa: req.body.nazwa,
                    opis: req.body.opis}
            });
    }catch(err){
        res.json({message:err});
    }
    if(req.session.user.czyAdmin) {
        res.redirect('../../cwiczenia/a_lista_cwiczen');
    }
    if(req.session.user.czyTrener) {
        res.redirect('../../cwiczenia/t_lista_cwiczen');
    }
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunieteCwiczenie = await Cwiczenia.deleteOne({id_cwiczenia: parseInt(req.params.id)})
    }catch(err){
        res.json({message:err});
    }
    if(req.session.user.czyAdmin) {
        res.redirect('../../cwiczenia/a_lista_cwiczen');
    }
    if(req.session.user.czyTrener) {
        res.redirect('../../cwiczenia/t_lista_cwiczen');
    }
});


module.exports = router;