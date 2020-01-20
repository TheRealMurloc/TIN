const express = require('express');
const router = express.Router();

const Trening_klasyczny = require('../../models/Trening_klasyczny');
const Grupa = require('../../models/Grupa');
const Trener = require('../../models/Trener');
const Osoba = require('../../models/Osoba');
const Obecnosc = require('../../models/Obecnosc');


//Uczestnik lista obecnosci
router.get('/u_lista_obecnosci', async (req, res) => {

    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaObecnosc = [];
    try {
        listaObecnosc = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }
    let lista = [];
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        let tmp = null;
        if(listaTrening_klasyczny[i].id_grupa === parseInt(req.session.user.id_grupy))
        {
            tmp = listaTrening_klasyczny[i];
            tmp.obecnosc = false;
        }
        for(let j=0; j<listaObecnosc.length; j++)
        {
            if(listaObecnosc[j].id_trening === listaTrening_klasyczny[i].id_trening && listaObecnosc[j].id_uczestnik === parseInt(req.session.user.id_osoby))
            {
                tmp.obecnosc = true;
            }
        }
        lista.push(tmp);
    }
    res.render('uczestnik/u_lista_obecnosci',
        {
            who: 'Uczestnik',
            lista: lista,
            user: req.session.user,
        })
});

//After form Admin
router.post('/a_lista_obecnosci', async (req, res) => {

    let lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaOsoba = [];
    try {
        listaOsoba = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaObecnosc = [];
    try {
        listaObecnosc = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }
    let idTrening = parseInt(req.body.trening);
    let idGrupa;
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = listaTrening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<listaOsoba.length; i++)
    {
        if(idGrupa === listaOsoba[i].id_grupy)
        {
            let tmpOsoba = listaOsoba[i];
            tmpOsoba.obecnosc = false;
            tmpOsoba.id_treningu = idTrening;
            for(let j=0; j<listaObecnosc.length; j++)
            {
                if(listaObecnosc[j].id_trening === idTrening && listaObecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
                {
                    tmpOsoba.obecnosc = true;
                }
            }
            lista.push(tmpOsoba);
        }
    }
    res.render('administrator/a_lista_obecnosci',
        {
            who: 'Administrator',
            osoba: lista,
            user: req.session.user,
            trening: idTrening
        })
});

//After form trener
router.post('/t_lista_obecnosci', async (req, res) => {

    let lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaOsoba = [];
    try {
        listaOsoba = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaObecnosc = [];
    try {
        listaObecnosc = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }
    let idTrening = parseInt(req.body.trening);
    let idGrupa;
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = listaTrening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<listaOsoba.length; i++)
    {
        if(idGrupa === listaOsoba[i].id_grupy)
        {
            let tmpOsoba = listaOsoba[i];
            tmpOsoba.obecnosc = false;
            tmpOsoba.id_treningu = idTrening;
            for(let j=0; j<listaObecnosc.length; j++)
            {
                if(listaObecnosc[j].id_trening === idTrening && listaObecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
                {
                    tmpOsoba.obecnosc = true;
                }
            }
            lista.push(tmpOsoba);
        }
    }
    res.render('trener/t_lista_obecnosci',
        {
            who: 'Trener',
            osoba: lista,
            user: req.session.user,
            trening: idTrening
        })
});

//After update Admin
router.get('/a_lista_obecnosci/:id', async (req, res) => {

    let lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaOsoba = [];
    try {
        listaOsoba = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaObecnosc = [];
    try {
        listaObecnosc = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }
    let idTrening = parseInt(req.params.id);
    let idGrupa;
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = listaTrening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<listaOsoba.length; i++)
    {
        if(idGrupa === listaOsoba[i].id_grupy)
        {
            let tmpOsoba = listaOsoba[i];
            tmpOsoba.obecnosc = false;
            for(let j=0; j<listaObecnosc.length; j++)
            {
                if(listaObecnosc[j].id_trening === idTrening && listaObecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
                {
                    tmpOsoba.obecnosc = true;
                }
            }
            lista.push(tmpOsoba);
        }
    }
    res.render('administrator/a_lista_obecnosci',
        {
            who: 'Administrator',
            osoba: lista,
            user: req.session.user,
            trening: idTrening
        })
});

//After update trener
router.get('/t_lista_obecnosci/:id', async (req, res) => {

    let lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaOsoba = [];
    try {
        listaOsoba = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaObecnosc = [];
    try {
        listaObecnosc = await Obecnosc.find();
    } catch (err) {
        res.json({message: err});
    }
    let idTrening = parseInt(req.params.id);
    let idGrupa;
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = listaTrening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<listaOsoba.length; i++)
    {
        if(idGrupa === listaOsoba[i].id_grupy)
        {
            let tmpOsoba = listaOsoba[i];
            tmpOsoba.obecnosc = false;
            for(let j=0; j<listaObecnosc.length; j++)
            {
                if(listaObecnosc[j].id_trening === idTrening && listaObecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
                {
                    tmpOsoba.obecnosc = true;
                }
            }
            lista.push(tmpOsoba);
        }
    }
    res.render('trener/t_lista_obecnosci',
        {
            who: 'Trener',
            osoba: lista,
            user: req.session.user,
            trening: idTrening
        })
});

router.get('/a_lista_obecnosci_wybor', async (req, res) => {
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    res.render('administrator/a_lista_obecnosci_wybor',
        {
            who: 'Administrator',
            trening_klasyczny: listaTrening_klasyczny,
            user: req.session.user
        })
});

router.get('/t_lista_obecnosci_wybor', async (req, res) => {

    lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trener === parseInt(req.session.user.id_osoby))
        {
            lista.push(listaTrening_klasyczny[i]);
        }
    }
    res.render('trener/t_lista_obecnosci_wybor',
        {
            who: 'Trener',
            trening_klasyczny: lista,
            user: req.session.user
        })
});

router.get('/u_kalendarz_zajec', async (req, res) => {

    lista = [];
    let listaTrening_klasyczny = [];
    try {
        listaTrening_klasyczny = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_grupa === parseInt(req.session.user.id_grupy))
        {
            lista.push(listaTrening_klasyczny[i]);
        }
    }
    res.render('uczestnik/u_kalendarz_zajec',
    {
        who: 'Uczestnik',
        trening_klasyczny: lista,
        user: req.session.user
    })
});

router.get('/a_lista_treningow_klasycznych', async (req, res) =>
{
    let listaTrening_klasyczny = [];
    let lista;
    try {
        lista = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trening: lista[i].id_trening,
            id_trener: lista[i].id_trener,
            id_grupa: lista[i].id_grupa,
            data: lista[i].data,
            godzina_rozpoczecia: lista[i].godzina_rozpoczecia,
            godzina_zakonczenia: lista[i].godzina_zakonczenia
        };
        listaTrening_klasyczny.push(tmp);
    }
    res.render('administrator/a_lista_treningow_klasycznych',
        {
            who: 'Administrator',
            trening_klasyczny: listaTrening_klasyczny,
            user: req.session.user
        })
});

router.get('/a_zmiana_treningu_klasycznego/:id', async (req, res) => {
    let lista;
    let listaTrening_klasyczny = [];
    try {
        lista = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trening: lista[i].id_trening,
            id_trener: lista[i].id_trener,
            id_grupa: lista[i].id_grupa,
            data: lista[i].data,
            godzina_rozpoczecia: lista[i].godzina_rozpoczecia,
            godzina_zakonczenia: lista[i].godzina_zakonczenia
        };
        listaTrening_klasyczny.push(tmp);
    }

    let listaGrupa = [];
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
        listaGrupa.push(tmp);
    }

    let listaTrener = [];
    try {
        lista = await Trener.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trener: lista[i].id_trener
        };
        listaTrener.push(tmp);
    }
    let tmp = null;
    for(let i=0; i<listaTrening_klasyczny.length; i++)
    {
        if(listaTrening_klasyczny[i].id_trening === parseInt(req.params.id))
        {
            tmp = {
                id_trening: listaTrening_klasyczny[i].id_trening,
                id_trener: listaTrening_klasyczny[i].id_trener,
                id_grupa: listaTrening_klasyczny[i].id_grupa,
                data: listaTrening_klasyczny[i].data,
                godzina_rozpoczecia: listaTrening_klasyczny[i].godzina_rozpoczecia,
                godzina_zakonczenia: listaTrening_klasyczny[i].godzina_zakonczenia
            };
        }
    }
    res.render('../views/administrator/a_zmiana_treningu_klasycznego',
        {
            who: 'Administrator',
            trening_klasyczny: listaTrening_klasyczny,
            grupa: listaGrupa,
            trener: listaTrener,
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_trening_klasyczny', async (req, res) => {
    let lista;
    let listaTrening_klasyczny = [];
    try {
        lista = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trening: lista[i].id_trening,
            id_trener: lista[i].id_trener,
            id_grupa: lista[i].id_grupa,
            data: lista[i].data,
            godzina_rozpoczecia: lista[i].godzina_rozpoczecia,
            godzina_zakonczenia: lista[i].godzina_zakonczenia
        };
        listaTrening_klasyczny.push(tmp);
    }

    let listaGrupa = [];
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
        listaGrupa.push(tmp);
    }

    let listaTrener = [];
    try {
        lista = await Trener.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_trener: lista[i].id_trener
        };
        listaTrener.push(tmp);
    }
    res.render('administrator/a_trening_klasyczny',
        {
            who: 'Administrator',
            trening_klasyczny: listaTrening_klasyczny,
            grupa: listaGrupa,
            trener: listaTrener,
            user: req.session.user
        })
});

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Trening_klasyczny.find();
    } catch (err) {
        res.json({message: err});
    }
    const newTrening_klasyczny = new Trening_klasyczny({
        id_trening: nextId.length+1,
        id_trener: parseInt(req.body.trener),
        id_grupa: parseInt(req.body.grupa),
        data: req.body.data,
        godzina_rozpoczecia: req.body.start,
        godzina_zakonczenia: req.body.end
    });
    try{
        const savedTrening_klasyczny = await newTrening_klasyczny.save();
    } catch (err) {
        res.json({ message: err });
    }
    res.redirect('../api/trening_klasyczny/a_lista_treningow_klasycznych');
});

// Update
router.post('/update/:id', async (req, res) => {
    try{
        const updatedTrening_klasyczny = await Trening_klasyczny.updateOne(
            {id_trening: parseInt(req.params.id)},
            {$set: {id_trener: req.body.trener,
                    id_grupa: req.body.grupa,
                    data: req.body.data,
                    godzina_rozpoczecia: req.body.start,
                    godzina_zakonczenia: req.body.end,}
            });
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../trening_klasyczny/a_lista_treningow_klasycznych');
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunietyTrening = await Trening_klasyczny.deleteOne({id_trening: req.params.id})
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../trening_klasyczny/a_lista_treningow_klasycznych');
});

module.exports = router;