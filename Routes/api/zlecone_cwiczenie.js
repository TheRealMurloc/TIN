const express = require('express');
const router = express.Router();

const osoba = require('../../Table/Osoba');
const cwiczenia = require('../../Table/Cwiczenia');
const trening_internetowy = require('../../Table/Trening_internetowy');
const zlecone_cwiczenie = require('../../Table/Zlecone_cwiczenie');
const grupa = require('../../Table/Grupa');

router.get('/a_lista_zlecen_indywidualnych/:id', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(!zlecone_cwiczenie[i].cwiczenie_grupowe && zlecone_cwiczenie[i].id_trening === parseInt(req.params.id))
        {
            let tmp = zlecone_cwiczenie[i];
            for(let j=0; j<osoba.length; j++)
            {
                if(osoba[j].id_osoby === tmp.id_osoba)
                {
                    tmp.ksywka = osoba[j].ksywka;
                    break;
                }
            }
            lista.push(tmp);
        }
    }
    res.render('administrator/a_lista_zlecen_indywidualnych',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista,
            user: user
        })
});

//tutaj !
router.get('/a_lista_zlecen_grupowych/:id', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].cwiczenie_grupowe && zlecone_cwiczenie[i].id_trening === parseInt(req.params.id))
        {
            let tmp = zlecone_cwiczenie[i];
            for(let j=0; j<osoba.length; j++)
            {
                if(osoba[j].id_osoby === tmp.id_osoba)
                {
                    tmp.ksywka = osoba[j].ksywka;
                    break;
                }
            }
            lista.push(tmp);
        }
    }
    res.render('administrator/a_lista_zlecen_grupowych',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista,
            user: user
        })
});

router.get('/u_ranking_grupowy', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        lista.push(zlecone_cwiczenie[i]);
    }
    res.render('uczestnik/u_ranking_grupowy',
        {
            who: 'Uczestnik | ID: ' + user.id_osoby,
            zlecone_cwiczenie: lista,
            user: user
        })
});

router.get('/t_ranking_grupowy', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            let tmp = zlecone_cwiczenie[i];
            for(let j=0; j<osoba.length; j++)
            {
                if(osoba[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = osoba[j].ksywka;
                    break;
                }
            }
            lista.push(tmp);
        }
    }
    res.render('trener/t_ranking_grupowy',
        {
            who: 'Trener',
            zlecone_cwiczenie: lista,
            user: user
        })
});

router.get('/t_ranking_indywidualny', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(!zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            let tmp = zlecone_cwiczenie[i];
            for(let j=0; j<osoba.length; j++)
            {
                if(osoba[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = osoba[j].ksywka;
                    break;
                }
            }
            lista.push(tmp);
        }
    }
    res.render('trener/t_ranking_indywidualny',
        {
            who: 'Trener',
            zlecone_cwiczenie: lista,
            user: user
        })
});

router.get('/a_ranking_grupowy', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        lista.push(zlecone_cwiczenie[i]);
    }
    res.render('administrator/a_ranking_grupowy',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista,
            user: user
        })
});

router.get('/a_ranking_indywidualny', (req, res) =>
{
    let user = req.session.user;
    let lista = [];
    for (let i = 0; i < zlecone_cwiczenie.length; i++)
    {
        if(!zlecone_cwiczenie[i].cwiczenie_grupowe)
        {
            let tmp = zlecone_cwiczenie[i];
            for(let j=0; j<osoba.length; j++)
            {
                if(osoba[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = osoba[j].ksywka;
                    break;
                }
            }
            lista.push(tmp);
        }
    }
    res.render('administrator/a_ranking_indywidualny',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista,
            user: user
        })
});

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
    let dzis = "";
    let d = new Date();
    dzis = dzis + d.getFullYear() + "-";
    if((d.getMonth()+1) < 10)
        dzis = dzis + "0" + (d.getMonth()+1) + "-";
    else
        dzis = dzis + d.getMonth() + "-";
    if(d.getDate() < 10)
        dzis = dzis + "0" + d.getDate();
    else
        dzis = dzis + d.getDate();
    let user = req.session.user;
    let listaTreningow = [];
    let lista = [];
    for(let i=0; i<trening_internetowy.length; i++)
    {
        if(dzis >= trening_internetowy[i].dataOd && dzis <= trening_internetowy[i].dataDo)
        {
            listaTreningow.push(trening_internetowy[i]);
        }
    }
    for(let i=0; i<listaTreningow.length; i++) {
        for (let j = 0; j < zlecone_cwiczenie.length; j++) {
            if (zlecone_cwiczenie[j].id_osoba === user.id_osoby && !zlecone_cwiczenie[j].cwiczenie_grupowe && zlecone_cwiczenie[j].id_trening === listaTreningow[i].id_trening) {
                lista.push(zlecone_cwiczenie[j]);
            }
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
    let dzis = "";
    let d = new Date();
    dzis = dzis + d.getFullYear() + "-";
    if((d.getMonth()+1) < 10)
        dzis = dzis + "0" + (d.getMonth()+1) + "-";
    else
        dzis = dzis + d.getMonth() + "-";
    if(d.getDate() < 10)
        dzis = dzis + "0" + d.getDate();
    else
        dzis = dzis + d.getDate();
    let user = req.session.user;
    let listaTreningow = [];
    let lista = [];
    for(let i=0; i<trening_internetowy.length; i++)
    {
        if(dzis >= trening_internetowy[i].dataOd && dzis <= trening_internetowy[i].dataDo)
        {
            listaTreningow.push(trening_internetowy[i]);
        }
    }
    for(let i=0; i<listaTreningow.length; i++) {
        for (let j = 0; j < zlecone_cwiczenie.length; j++) {
            if (zlecone_cwiczenie[j].id_osoba === user.id_osoby && zlecone_cwiczenie[j].cwiczenie_grupowe && zlecone_cwiczenie[j].id_trening === listaTreningow[i].id_trening) {
                lista.push(zlecone_cwiczenie[j]);
            }
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
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) < 30)
                {
                    zlecone_cwiczenie[i].wynik = "Niski";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 30)
                {
                    zlecone_cwiczenie[i].wynik = "Sredni";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 70)
                {
                    zlecone_cwiczenie[i].wynik = "Wysoki";
                }
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
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) < 30)
                {
                    zlecone_cwiczenie[i].wynik = "Niski";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 30)
                {
                    zlecone_cwiczenie[i].wynik = "Sredni";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 70)
                {
                    zlecone_cwiczenie[i].wynik = "Wysoki";
                }
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
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) < 30)
                {
                    zlecone_cwiczenie[i].wynik = "Niski";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 30)
                {
                    zlecone_cwiczenie[i].wynik = "Sredni";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 70)
                {
                    zlecone_cwiczenie[i].wynik = "Wysoki";
                }
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
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) < 30)
                {
                    zlecone_cwiczenie[i].wynik = "Niski";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 30)
                {
                    zlecone_cwiczenie[i].wynik = "Sredni";
                }
                if((zlecone_cwiczenie[i].ilosc_zrobiona/zlecone_cwiczenie[i].ilosc_ogolem*100) >= 70)
                {
                    zlecone_cwiczenie[i].wynik = "Wysoki";
                }
            }
        }
    }

    res.redirect('../../../zlecone_cwiczenie/u_trening_grupowy');
});

// Delete Ind
router.post('/deleteInd/:idOsoby/:idCwiczenie/:idTrening', (req, res) => {
    for( let i=0; i<zlecone_cwiczenie.length; i++)
    {
        if(zlecone_cwiczenie[i].id_osoba === parseInt(req.params.idOsoby) && zlecone_cwiczenie[i].id_cwiczenia === parseInt(req.params.idCwiczenie) && zlecone_cwiczenie[i].cwiczenie_grupowe === false && zlecone_cwiczenie[i].id_trening === parseInt(req.params.idTrening))
        {
            zlecone_cwiczenie.splice(i, 1);
        }
    }
    let page = '/api/zlecone_cwiczenie/a_lista_zlecen_indywidualnych/';
    page += parseInt(req.params.idTrening);
    res.redirect(page);
});

// Delete Group
router.post('/deleteGroup/:idOsoby/:idCwiczenie/:idTrening', (req, res) => {
    for(let i=0; i<zlecone_cwiczenie.length; i++)
    {
        for(let j=0; j<osoba.length; j++)
        {
            if(parseInt(req.params.idOsoby) === osoba[j].id_osoby)
            {
                if(zlecone_cwiczenie[i].id_trening === parseInt(req.params.idTrening) && zlecone_cwiczenie[i].id_cwiczenia === parseInt(req.params.idCwiczenie))
                {
                    zlecone_cwiczenie.splice(i, 1);
                }
            }
        }
    }

    let page = '/api/zlecone_cwiczenie/a_lista_zlecen_grupowych/';
    page += parseInt(req.params.idTrening);
    res.redirect(page);
});


module.exports = router;