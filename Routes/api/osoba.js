const express = require('express');
const router = express.Router();

const Osoba = require('../../models/Osoba');
const Grupa = require('../../models/Grupa');
const Trener = require('../../models/Trener');
const Uczestnik = require('../../models/Uczestnik');


router.get('/u_strona_glowna', (req, res) => res.render('uczestnik/u_strona_glowna',
    {
        user: req.session.user,
        who: 'Uczestnik'
    }));

router.get('/t_strona_glowna', (req, res) => res.render('trener/t_strona_glowna',
    {
        user: req.session.user,
        who: 'Trener'
    }));

router.get('/a_strona_glowna', (req, res) => res.render('administrator/a_strona_glowna',
    {
        user: req.session.user,
        who: 'Administrator'
    }));

router.get('/a_lista_osob', async (req, res) => {
    let listaOsob = [];
    let lista;
    try {
        lista = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_osoby: lista[i].id_osoby,
            id_grupy: lista[i].id_grupy,
            login: lista[i].login,
            haslo: lista[i].haslo,
            imie: lista[i].imie,
            nazwisko: lista[i].nazwisko,
            ksywka: lista[i].ksywka,
            email: lista[i].email,
            telefon: lista[i].telefon,
            czyUczestnik: lista[i].czyUczestnik,
            czyTrener: lista[i].czyTrener,
            czyAdmin: lista[i].czyAdmin,
        };
        listaOsob.push(tmp);
    }

    res.render('administrator/a_lista_osob',
        {
            who: 'Administrator',
            osoba: listaOsob,
            user: req.session.user
        })
});

router.get('/a_zmiana_osoby/:id', async (req, res) => {
    let listaOsob = [];
    try {
        listaOsob = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let tmp = null;
    for(let i=0; i<listaOsob.length; i++)
    {
        if(listaOsob[i].id_osoby === parseInt(req.params.id))
        {
            tmp = {
                id_osoby: listaOsob[i].id_osoby,
                id_grupy: listaOsob[i].id_grupy,
                login: listaOsob[i].login,
                haslo: listaOsob[i].haslo,
                imie: listaOsob[i].imie,
                nazwisko: listaOsob[i].nazwisko,
                ksywka: listaOsob[i].ksywka,
                email: listaOsob[i].email,
                telefon: listaOsob[i].telefon,
                czyUczestnik: listaOsob[i].czyUczestnik,
                czyTrener: listaOsob[i].czyTrener,
                czyAdmin: listaOsob[i].czyAdmin,
            };
        }
    }

    let listaGrup = [];
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
        listaGrup.push(tmp);
    }

    res.render('administrator/a_zmiana_osoby',
        {
            who: 'Administrator',
            grupa: listaGrup,
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_szczegoly_osoby/:id', async (req, res) => {
    let listaOsob = [];
    try {
        listaOsob = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaGrup = [];
    try {
        listaGrup = await Grupa.find();
    } catch (err) {
        res.json({message: err});
    }
    let tmp = null;
    for(let i=0; i<listaOsob.length; i++)
    {
        if(listaOsob[i].id_osoby === parseInt(req.params.id))
        {
            tmp = {
                id_osoby: listaOsob[i].id_osoby,
                id_grupy: listaOsob[i].id_grupy,
                login: listaOsob[i].login,
                haslo: listaOsob[i].haslo,
                imie: listaOsob[i].imie,
                nazwisko: listaOsob[i].nazwisko,
                ksywka: listaOsob[i].ksywka,
                email: listaOsob[i].email,
                telefon: listaOsob[i].telefon,
                czyUczestnik: listaOsob[i].czyUczestnik,
                czyTrener: listaOsob[i].czyTrener,
                czyAdmin: listaOsob[i].czyAdmin,
            };
        }
    }
    res.render('administrator/a_szczegoly_osoby',
        {
            who: 'Administrator',
            tmpElement: tmp,
            user: req.session.user
        })
});

router.get('/a_dodaj_uczestnika', async (req, res) => {
    let listaOsob = [];
    try {
        listaOsob = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let listaGrup = [];
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
        listaGrup.push(tmp);
    }
    res.render('administrator/a_dodaj_uczestnika',
        {
            who: 'Administrator',
            grupa: listaGrup,
            user: req.session.user
        })
});

router.get('/a_zmiana_hasla', async (req, res) => {
    res.render('administrator/a_zmiana_hasla',
        {
            who: 'Administrator',
            user: req.session.user
        })
});

router.get('/t_zmiana_hasla', async (req, res) => {
    res.render('trener/t_zmiana_hasla',
        {
            who: 'Trener',
            user: req.session.user
        })
});

router.get('/u_zmiana_hasla', (req, res) => res.render('uczestnik/u_zmiana_hasla',
    {
        who: 'Uczestnik',
        user: req.session.user
    }));

router.get('/t_zmiana_ksywki', (req, res) => res.render('trener/t_zmiana_ksywki',
    {
        who: 'Trener',
        user: req.session.user
    }));

router.get('/u_zmiana_ksywki', (req, res) => res.render('uczestnik/u_zmiana_ksywki',
    {
        who: 'Uczestnik',
        user: req.session.user
    }));

router.get('/t_zmiana_email', (req, res) => res.render('trener/t_zmiana_email',
    {
        who: 'Trener',
        user: req.session.user
    }));

router.get('/u_zmiana_email', (req, res) => res.render('uczestnik/u_zmiana_email',
    {
        who: 'Uczestnik',
        user: req.session.user
    }));

router.get('/t_zmiana_tel', (req, res) => res.render('trener/t_zmiana_tel',
    {
        who: 'Trener',
        user: req.session.user
    }));

router.get('/u_zmiana_tel', (req, res) => res.render('uczestnik/u_zmiana_tel',
    {
        who: 'Uczestnik',
        user: req.session.user
    }));


router.post('/login', async (req, res) =>
    {
        let listaOsob = [];
        try {
            listaOsob = await Osoba.find();
        } catch (err) {
            res.json({message: err});
        }
        let user = null;
        for(let i=0; i < listaOsob.length; i++)
        {
            if(listaOsob[i].login === req.body.login)
            {
                user = listaOsob[i];
            }
        }
        if(user)
        {
            if(user.haslo === req.body.haslo)
            {
                req.session.user = user;
                if(user.czyAdmin)
                    res.render('administrator/a_strona_glowna', {user: user, who: 'Administrator'});
                if(user.czyTrener)
                    res.render('trener/t_strona_glowna', {user: user, who: 'Trener'});
                if(user.czyUczestnik)
                    res.render('uczestnik/u_strona_glowna', {user: user, who: 'Uczestnik'});
            }
            else
            {
                res.redirect('/');
            }
        }
        else
        {
            res.redirect('/');
        }
    });

router.get('/logout', (req, res) =>
{
    req.session.destroy(function (err) {
        if(err) {
            res.negotiate(err);
        }
        res.redirect('/');
    })
});

// Create
router.post('/', async (req, res) => {
    let nextId;
    try {
        nextId = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    let newOsoba;
    if(req.body.rola == "trener")
    {
        newOsoba = new Osoba({
            id_osoby: nextId.length+1,
            id_grupy: null,
            login: req.body.login,
            haslo: req.body.haslo,
            imie: req.body.imie,
            nazwisko: req.body.nazwisko,
            ksywka: req.body.ksywka,
            email: req.body.email,
            telefon: req.body.telefon,
            czyUczestnik: false,
            czyTrener: true,
            czyAdmin: false
        });
    }
    if(req.body.rola == "uczestnik")
    {
        newOsoba = new Osoba({
            id_osoby: nextId.length+1,
            id_grupy: parseInt(req.body.grupa),
            login: req.body.login,
            haslo: req.body.haslo,
            imie: req.body.imie,
            nazwisko: req.body.nazwisko,
            ksywka: req.body.ksywka,
            email: req.body.email,
            telefon: req.body.telefon,
            czyUczestnik: true,
            czyTrener: false,
            czyAdmin: false
        });
    }

    if(!newOsoba.login) {
        res.status(400).json({ msg: 'Wpisz login'});
        nextId--;
    } else {
        try{
            const savedOsoba = await newOsoba.save();
        } catch (err) {
            res.json({ message: err });
        }
    }
    if(newOsoba.czyTrener)
    {
        const newTrener = new Trener({
            id_trener: newOsoba.id_osoby
        });
        try{
            const savedTrener = await newTrener.save();
        } catch (err) {
            res.json({ message: err });
        }
    }
    if(newOsoba.czyUczestnik) {
        try {
            const newUczestnik = new Uczestnik({
                id_uczestnik: newOsoba.id_osoby
            });
            const savedUczestnik = await newUczestnik.save();
        } catch (err) {
            res.json({message: err});
        }
    }
    res.redirect('/api/osoba/a_lista_osob');
});

// Update
router.post('/update/:id', async (req, res) => {
    let trener;
    let uczestnik;
    if(req.body.rola === "trener")
    {
        trener = true;
    }
    else
    {
        trener = false;
    }
    if(req.body.rola === "uczestnik")
    {
        uczestnik = true;
    }
    else
    {
        uczestnik = false;
    }
    try{
        const updatedOsoba = await Osoba.updateOne(
            {id_cwiczenia: parseInt(req.params.id)},
            {$set: {login: req.body.login,
                    haslo: req.body.haslo,
                    imie: req.body.imie,
                    nazwisko: req.body.nazwisko,
                    ksywka: req.body.ksywka,
                    email: req.body.email,
                    telefon: req.body.telefon,
                    id_grupy: parseInt(req.body.grupa),
                    czyTrener:trener,
                    czyUczestnik: uczestnik}
            });
    }catch(err){
        res.json({message:err});
    }
    if(req.session.user.czyUczestnik)
        res.redirect('/api/osoba/u_strona_glowna');
    if(req.session.user.czyTrener)
        res.redirect('/api/osoba/t_strona_glowna');
    if(req.session.user.czyAdmin)
        res.redirect('/api/osoba/a_lista_osob');
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try{
        const usunietaOsoba= await Osoba.deleteOne({id_osoby: parseInt(req.params.id)})
    }catch(err){
        res.json({message:err});
    }
    try{
        const usunietyTrener= await Trener.deleteOne({id_trener: parseInt(req.params.id)})
    }catch(err){
        res.json({message:err});
    }
    try{
        const usunietyUczestnik= await Uczestnik.deleteOne({id_uczestnik: parseInt(req.params.id)})
    }catch(err){
        res.json({message:err});
    }
    res.redirect('../../osoba/a_lista_osob');
});


module.exports = router;