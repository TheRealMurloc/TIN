const express = require('express');
const router = express.Router();

const osoba = require('../../Table/Osoba');
const cwiczenia = require('../../Table/Cwiczenia');
const trening_internetowy = require('../../Table/Trening_internetowy');
const zlecone_cwiczenie = require('../../Table/Zlecone_cwiczenie');
const grupa = require('../../Table/Grupa');


router.get('/t_zlec_cwiczenie_indywidualne', (req, res) => {
    lista = [];
    for(let i=0; i<osoba.length; i++)
    {
        if(osoba[i].czyUczestnik)
        {
            lista.push(osoba[i]);
        }
    }

    res.render('trener/t_zlec_cwiczenie_indywidualne',
        {
            who: 'Trener',
            cwiczenia: cwiczenia,
            osoba: lista,
            trening_internetowy: trening_internetowy,
            user: req.session.user
        })
});

router.get('/t_zlec_cwiczenie_grupa', (req, res) => res.render('trener/t_zlec_cwiczenie_grupa',
    {
        who: 'Trener',
        cwiczenia: cwiczenia,
        grupa: grupa,
        trening_internetowy: trening_internetowy,
        user: req.session.user
    }));

router.get('/a_edytowanie_treningu_grupowego', (req, res) =>
{
    let user = req.session.user;
    let listaGrup = new Set();

    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        listaGrup.add(zlecone_cwiczenie[i].id_grupy);
    }

    res.render('administrator/a_edytowanie_treningu_grupowego',
    {
        who: 'Administrator',
        cwiczenia: cwiczenia,
        grupa: grupa,
        trening_internetowy: trening_internetowy,
        user: req.session.user
    })
});

router.get('/u_trening_indywidualny', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].id_osoba === user.id_osoby  && !zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            lista.push(zlecone_cwiczenie[i]);
        }
    }
    res.render('uczestnik/u_trening_indywidualny',
    {
        who: 'Uczestnik',
        zlecone_cwiczenie: lista,
        user: user
    })
});

router.get('/u_trening_grupowy', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            lista.push(zlecone_cwiczenie[i]);
        }
    }
    res.render('uczestnik/u_trening_grupowy',
        {
            who: 'Uczestnik',
            zlecone_cwiczenie: lista,
            user: user
        })
});

// Create indywidualne
router.post('/indywidualne/', (req, res) => {
    let tmpNazwa = "";
    for(let i=0; i < cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.body.cwiczenie))
        {
            tmpNazwa = cwiczenia[i].nazwa;
        }
    }
    const newZlecenie = {
        id_osoba: parseInt(req.body.osoba),
        id_cwiczenia: parseInt(req.body.cwiczenie),
        nazwa: tmpNazwa,
        id_trening: parseInt(req.body.trening),
        ilosc_serii: parseInt(req.body.serie),
        ilosc_zaplanowana: parseInt(req.body.ilosc),
        ilosc_ogolem: parseInt(req.body.ilosc*req.body.serie),
        ilosc_zrobiona: 0,
        wynik: "Niski",
        cwiczenie_grupowe: false
    }

    zlecone_cwiczenie.push(newZlecenie);
    res.redirect('../zlecone_cwiczenie/t_zlec_cwiczenie_indywidualne');
});

// Create grupowe
router.post('/grupa/', (req, res) => {
    let tmpNazwa = "";
    for(let i=0; i < cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.body.cwiczenie))
        {
            tmpNazwa = cwiczenia[i].nazwa;
        }
    }
    for(let i = 0; i < osoba.length; i++)
    {
        if(osoba[i].id_grupy === parseInt(req.body.grupa) && osoba[i].czyUczestnik)
        {

            const newZlecenie = {
                id_osoba: osoba[i].id_osoby,
                id_cwiczenia: parseInt(req.body.cwiczenie),
                nazwa: tmpNazwa,
                id_trening: parseInt(req.body.trening),
                ilosc_serii: parseInt(req.body.serie),
                ilosc_zaplanowana: parseInt(req.body.ilosc),
                ilosc_ogolem: parseInt(req.body.ilosc*req.body.serie),
                ilosc_zrobiona: 0,
                wynik: "Niski",
                cwiczenie_grupowe: true
            }
            zlecone_cwiczenie.push(newZlecenie);
        }
    }
    res.redirect('../zlecone_cwiczenie/t_zlec_cwiczenie_grupa');
});

// Update
router.post('/update/ind/', (req, res) => {
    let user = req.session.user;
    let iloscCwiczen = 0;
    for( let i=0; i<zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && !zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            iloscCwiczen++;
        }
    }

    if(iloscCwiczen > 1)
    {
        for( let i=0, j=0; i<zlecone_cwiczenie.length; i++)
        {
            if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && !zlecone_cwiczenie[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc[j] !== ''){
                    ilosc = parseInt(req.body.ilosc[j++]);
                }
                else{
                    j++;
                }
                zlecone_cwiczenie[i].ilosc_zrobiona += ilosc;
                console.log(zlecone_cwiczenie[i].ilosc_zrobiona);
            }
        }
    }
    else
    {
        for( let i=0; i<zlecone_cwiczenie.length; i++)
        {
            if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && !zlecone_cwiczenie[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc !== ''){
                    ilosc = parseInt(req.body.ilosc);
                }
                zlecone_cwiczenie[i].ilosc_zrobiona += ilosc;
            }
        }
    }

    res.redirect('../../../zlecone_cwiczenie/u_trening_indywidualny');
});

// Update
router.post('/update/grupa/', (req, res) => {
    let user = req.session.user;
    let iloscCwiczen = 0;
    for( let i=0; i<zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            iloscCwiczen++;
        }
    }

    if(iloscCwiczen > 1)
    {
        for( let i=0, j=0; i<zlecone_cwiczenie.length; i++)
        {
            if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && zlecone_cwiczenie[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc[j] !== ''){
                    ilosc = parseInt(req.body.ilosc[j++]);
                }
                else{
                    j++;
                }
                zlecone_cwiczenie[i].ilosc_zrobiona += ilosc;
            }
        }
    }
    else
    {
        for( let i=0; i<zlecone_cwiczenie.length; i++)
        {
            if(zlecone_cwiczenie[i].id_osoba === user.id_osoby && zlecone_cwiczenie[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc !== ''){
                    ilosc = parseInt(req.body.ilosc);
                }
                zlecone_cwiczenie[i].ilosc_zrobiona += ilosc;
            }
        }
    }

    res.redirect('../../../zlecone_cwiczenie/u_trening_grupowy');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.params.id))
        {
            cwiczenia.splice(i, 1);
        }
    }
    res.redirect('../../cwiczenia/a_lista_cwiczen');
});


module.exports = router;