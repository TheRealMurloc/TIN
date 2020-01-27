const express = require('express');
const router = express.Router();

const Osoba = require('../../models/Osoba');
const Cwiczenia = require('../../models/Cwiczenia');
const Trening_internetowy = require('../../models/Trening_internetowy');
const Zlecone_cwiczenie = require('../../models/Zlecone_cwiczenie');
const Grupa = require('../../models/Grupa');

router.get('/a_lista_zlecen_indywidualnych/:id', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista_osob = [];
    let lista_wynik = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(!lista[i].cwiczenie_grupowe) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    try {
        lista = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].czyUczestnik) {
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
                czyAdmin: lista[i].czyAdmin
            };
            lista_osob.push(tmp);
        }
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(!lista_zlecen[i].cwiczenie_grupowe && lista_zlecen[i].id_trening === parseInt(req.params.id))
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.ksywka = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('administrator/a_lista_zlecen_indywidualnych',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/a_lista_zlecen_grupowych/:id', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista_osob = [];
    let lista_wynik = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].cwiczenie_grupowe) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    try {
        lista = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].czyUczestnik) {
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
                czyAdmin: lista[i].czyAdmin
            };
            lista_osob.push(tmp);
        }
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(lista_zlecen[i].cwiczenie_grupowe && lista_zlecen[i].id_trening === parseInt(req.params.id))
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.ksywka = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('administrator/a_lista_zlecen_grupowych',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/u_ranking_grupowy', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].cwiczenie_grupowe) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    res.render('uczestnik/u_ranking_grupowy',
        {
            who: 'Uczestnik | ID: ' + user.id_osoby,
            zlecone_cwiczenie: lista_zlecen,
            user: user
        })
});

router.get('/t_ranking_grupowy', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_osoba: lista[i].id_osoba,
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            id_trening: lista[i].id_trening,
            ilosc_serii: lista[i].ilosc_serii,
            ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
            ilosc_ogolem: lista[i].ilosc_ogolem,
            ilosc_zrobiona: lista[i].ilosc_zrobiona,
            wynik: lista[i].wynik,
            cwiczenie_grupowe: lista[i].cwiczenie_grupowe
        };
        lista_zlecen.push(tmp);
    }
    let lista_osob = [];
    let lista_wynik = [];
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
            czyAdmin: lista[i].czyAdmin
        };
        lista_osob.push(tmp);
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(lista_zlecen[i].cwiczenie_grupowe)
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('trener/t_ranking_grupowy',
        {
            who: 'Trener',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/t_ranking_indywidualny', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_osoba: lista[i].id_osoba,
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            id_trening: lista[i].id_trening,
            ilosc_serii: lista[i].ilosc_serii,
            ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
            ilosc_ogolem: lista[i].ilosc_ogolem,
            ilosc_zrobiona: lista[i].ilosc_zrobiona,
            wynik: lista[i].wynik,
            cwiczenie_grupowe: lista[i].cwiczenie_grupowe
        };
        lista_zlecen.push(tmp);
    }
    let lista_osob = [];
    let lista_wynik = [];
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
            czyAdmin: lista[i].czyAdmin
        };
        lista_osob.push(tmp);
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(!lista_zlecen[i].cwiczenie_grupowe)
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('trener/t_ranking_indywidualny',
        {
            who: 'Trener',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/a_ranking_grupowy', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_osoba: lista[i].id_osoba,
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            id_trening: lista[i].id_trening,
            ilosc_serii: lista[i].ilosc_serii,
            ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
            ilosc_ogolem: lista[i].ilosc_ogolem,
            ilosc_zrobiona: lista[i].ilosc_zrobiona,
            wynik: lista[i].wynik,
            cwiczenie_grupowe: lista[i].cwiczenie_grupowe
        };
        lista_zlecen.push(tmp);
    }
    let lista_osob = [];
    let lista_wynik = [];
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
            czyAdmin: lista[i].czyAdmin
        };
        lista_osob.push(tmp);
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(lista_zlecen[i].cwiczenie_grupowe)
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('administrator/a_ranking_grupowy',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/a_ranking_indywidualny', async (req, res) =>
{
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_osoba: lista[i].id_osoba,
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
            id_trening: lista[i].id_trening,
            ilosc_serii: lista[i].ilosc_serii,
            ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
            ilosc_ogolem: lista[i].ilosc_ogolem,
            ilosc_zrobiona: lista[i].ilosc_zrobiona,
            wynik: lista[i].wynik,
            cwiczenie_grupowe: lista[i].cwiczenie_grupowe
        };
        lista_zlecen.push(tmp);
    }
    let lista_osob = [];
    let lista_wynik = [];
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
            czyAdmin: lista[i].czyAdmin
        };
        lista_osob.push(tmp);
    }
    for (let i = 0; i < lista_zlecen.length; i++)
    {
        if(!lista_zlecen[i].cwiczenie_grupowe)
        {
            let tmp = lista_zlecen[i];
            for(let j=0; j<lista_osob.length; j++)
            {
                if(lista_osob[j].id_osoby === tmp.id_osoba)
                {
                    tmp.id_osoba = lista_osob[j].ksywka;
                    break;
                }
            }
            lista_wynik.push(tmp);
        }
    }
    res.render('administrator/a_ranking_indywidualny',
        {
            who: 'Administrator',
            zlecone_cwiczenie: lista_wynik,
            user: user
        })
});

router.get('/t_zlec_cwiczenie_indywidualne', async (req, res) => {
    let lista;
    let listaCwiczenia = [];
    try {
        lista = await Cwiczenia.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++) {
        const tmp = {
            id_cwiczenia: lista[i].id_cwiczenia,
            nazwa: lista[i].nazwa,
        };
        listaCwiczenia.push(tmp);
    }
    let listaOsob = [];
    try {
        lista = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].czyUczestnik) {
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
                czyAdmin: lista[i].czyAdmin
            };
            listaOsob.push(tmp);
        }
    }
    let listaTreningow = [];
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
        listaTreningow.push(tmp);
    }
    res.render('trener/t_zlec_cwiczenie_indywidualne',
        {
            who: 'Trener',
            cwiczenia: listaCwiczenia,
            osoba: listaOsob,
            trening_internetowy: listaTreningow,
            user: req.session.user
        })
});

router.get('/t_zlec_cwiczenie_grupa', async (req, res) => {
    let lista;
    let listaCwiczenia = [];
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
        };
        listaCwiczenia.push(tmp);
    }
    let listaGrup = [];
    try {
        lista = await Grupa.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        const tmp = {
            id_grupy: lista[i].id_grupy,
            nazwa: lista[i].nazwa,
        };
        listaGrup.push(tmp);
    }
    let listaTreningow = [];
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
        listaTreningow.push(tmp);
    }

    res.render('trener/t_zlec_cwiczenie_grupa',
        {
            who: 'Trener',
            cwiczenia: listaCwiczenia,
            grupa: listaGrup,
            trening_internetowy: listaTreningow,
            user: req.session.user
        })
});

router.get('/u_trening_indywidualny', async (req, res) =>
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
    let lista;
    let listaTreningow = [];
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
        listaTreningow.push(tmp);
    }

    let lista_zlecen = [];
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(!lista[i].cwiczenie_grupowe) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    let wynik = [];
    let wynikTrening = [];
    for(let i=0; i<listaTreningow.length; i++)
    {
        if(dzis >= listaTreningow[i].dataOd && dzis <= listaTreningow[i].dataDo)
        {
            wynikTrening.push(listaTreningow[i]);
        }
    }
    for(let i=0; i<wynikTrening.length; i++) {
        for (let j = 0; j < lista_zlecen.length; j++) {
            if (lista_zlecen[j].id_osoba === user.id_osoby && !lista_zlecen[j].cwiczenie_grupowe && lista_zlecen[j].id_trening === wynikTrening[i].id_trening) {
                wynik.push(lista_zlecen[j]);
            }
        }
    }
    res.render('uczestnik/u_trening_indywidualny',
    {
        who: 'Uczestnik',
        zlecone_cwiczenie: wynik,
        user: user
    })
});

router.get('/u_trening_grupowy', async (req, res) =>
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
    let lista;
    let listaTreningow = [];
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
        listaTreningow.push(tmp);
    }

    let lista_zlecen = [];
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].cwiczenie_grupowe) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    let wynik = [];
    let wynikTrening = [];
    for(let i=0; i<listaTreningow.length; i++)
    {
        if(dzis >= listaTreningow[i].dataOd && dzis <= listaTreningow[i].dataDo)
        {
            wynikTrening.push(listaTreningow[i]);
        }
    }
    for(let i=0; i<wynikTrening.length; i++) {
        for (let j = 0; j < lista_zlecen.length; j++) {
            if (lista_zlecen[j].id_osoba === user.id_osoby && lista_zlecen[j].cwiczenie_grupowe && lista_zlecen[j].id_trening === wynikTrening[i].id_trening) {
                wynik.push(lista_zlecen[j]);
            }
        }
    }
    res.render('uczestnik/u_trening_grupowy',
        {
            who: 'Uczestnik',
            zlecone_cwiczenie: wynik,
            user: user
        })
});

// Create indywidualne
router.post('/indywidualne/', async (req, res) => {
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
    let tmpNazwa = "";

    for(let i=0; i < cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.body.cwiczenie))
        {
            tmpNazwa = cwiczenia[i].nazwa;
        }
    }
    const newZlecenie = new Zlecone_cwiczenie({
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
    });
    try{
        const savedCwiczenie = await newZlecenie.save();
    } catch (err) {
        res.json({ message: err });
    }
    res.redirect('../zlecone_cwiczenie/t_zlec_cwiczenie_indywidualne');
});

// Create grupowe
router.post('/grupa/', async (req, res) => {
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
    let osoba = [];
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
            czyAdmin: lista[i].czyAdmin
        };
        osoba.push(tmp);
    }
    let tmpNazwa = "";
    for(let i=0; i < cwiczenia.length; i++)
    {
        if(cwiczenia[i].id_cwiczenia === parseInt(req.body.cwiczenie))
        {
            tmpNazwa = cwiczenia[i].nazwa;
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        if(osoba[i].czyUczestnik) {
            if(osoba[i].id_grupy === parseInt(req.body.grupa)) {
                const newZlecenie = new Zlecone_cwiczenie({
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
                });
                try{
                    const savedZlecenie = await newZlecenie.save();
                } catch (err) {
                    res.json({ message: err });
                }
            }
        }
    }
    res.redirect('../zlecone_cwiczenie/t_zlec_cwiczenie_grupa');
});

// Update
router.post('/update/ind/', async (req, res) => {
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(!lista[i].cwiczenie_grupowe && lista[i].id_osoba === user.id_osoby) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    let iloscCwiczen = lista_zlecen.length;

    if(iloscCwiczen > 1)
    {
        for( let i=0, j=0; i<lista_zlecen.length; i++)
        {
            if(lista_zlecen[i].id_osoba === user.id_osoby && !lista_zlecen[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc[j] !== ''){
                    ilosc = parseInt(req.body.ilosc[j++]);
                }
                else{
                    j++;
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) < 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: ilosc_zrobiona+ilosc,
                                    wynik: "Niski"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: ilosc_zrobiona+ilosc,
                                    wynik: "Sredni"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 70)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: ilosc_zrobiona+ilosc,
                                    wynik: "Wysoki"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
            }
        }
    }
    else
    {
        for( let i=0; i<lista_zlecen.length; i++)
        {
            if(lista_zlecen[i].id_osoba === user.id_osoby && !lista_zlecen[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc !== ''){
                    ilosc = parseInt(req.body.ilosc);
                }
                let wynik = lista_zlecen[i].ilosc_zrobiona += ilosc;
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) < 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Niski"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Sredni"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 70)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: false, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Wysoki"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
            }
        }
    }
    res.redirect('../../../zlecone_cwiczenie/u_trening_indywidualny');
});

// Update
router.post('/update/grupa/', async (req, res) => {
    let user = req.session.user;
    let lista_zlecen = [];
    let lista;
    try {
        lista = await Zlecone_cwiczenie.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].cwiczenie_grupowe && lista[i].id_osoba === user.id_osoby) {
            const tmp = {
                id_osoba: lista[i].id_osoba,
                id_cwiczenia: lista[i].id_cwiczenia,
                nazwa: lista[i].nazwa,
                id_trening: lista[i].id_trening,
                ilosc_serii: lista[i].ilosc_serii,
                ilosc_zaplanowana: lista[i].ilosc_zaplanowana,
                ilosc_ogolem: lista[i].ilosc_ogolem,
                ilosc_zrobiona: lista[i].ilosc_zrobiona,
                wynik: lista[i].wynik,
                cwiczenie_grupowe: lista[i].cwiczenie_grupowe
            };
            lista_zlecen.push(tmp);
        }
    }
    let iloscCwiczen = lista_zlecen.length;

    if(iloscCwiczen > 1)
    {
        for( let i=0, j=0; i<lista_zlecen.length; i++)
        {
            if(lista_zlecen[i].id_osoba === user.id_osoby && lista_zlecen[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc[j] !== ''){
                    ilosc = parseInt(req.body.ilosc[j++]);
                }
                else{
                    j++;
                }
                let wynik = lista_zlecen[i].ilosc_zrobiona += ilosc;
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) < 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Niski"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Sredni"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 70)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Wysoki"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
            }
        }
    }
    else
    {
        for( let i=0; i<lista_zlecen.length; i++)
        {
            if(lista_zlecen[i].id_osoba === user.id_osoby && lista_zlecen[i].cwiczenie_grupowe)
            {
                let ilosc = 0;
                if(req.body.ilosc !== ''){
                    ilosc = parseInt(req.body.ilosc);
                }
                let wynik = lista_zlecen[i].ilosc_zrobiona += ilosc;
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) < 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Niski"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 30)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Sredni"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
                if((lista_zlecen[i].ilosc_zrobiona/lista_zlecen[i].ilosc_ogolem*100) >= 70)
                {
                    try{
                        const updatedZlecenie = await Zlecone_cwiczenie.updateOne(
                            {id_osoba: user.id_osoby, cwiczenie_grupowe: true, id_trening: lista_zlecen[i].id_trening, id_cwiczenia: lista_zlecen[i].id_cwiczenia},
                            {$set: {ilosc_zrobiona: wynik,
                                    wynik: "Wysoki"}
                            });
                    }catch(err){
                        res.json({message:err});
                    }
                }
            }
        }
    }
    res.redirect('../../../zlecone_cwiczenie/u_trening_grupowy');
});

// Delete Ind
router.post('/deleteInd/:idOsoby/:idCwiczenie/:idTrening', async (req, res) => {
    try{
        const usunieteZlecenie = await Zlecone_cwiczenie.deleteOne({id_osoba: parseInt(req.params.idOsoby), id_cwiczenia: parseInt(req.params.idCwiczenie), id_trening: parseInt(req.params.idTrening), cwiczenie_grupowe: false})
    }catch(err){
        res.json({message:err});
    }
    let page = '/api/zlecone_cwiczenie/a_lista_zlecen_indywidualnych/';
    page += parseInt(req.params.idTrening);
    res.redirect(page);
});

// Delete Group
router.post('/deleteGroup/:idOsoby/:idCwiczenie/:idTrening', async (req, res) => {
    let osoba = [];
    let lista;
    try {
        lista = await Osoba.find();
    } catch (err) {
        res.json({message: err});
    }
    for(let i=0; i<lista.length; i++)
    {
        if(lista[i].czyUczestnik) {
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
                czyAdmin: lista[i].czyAdmin
                };
            osoba.push(tmp);
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        try{
            const usunieteZlecenie = await Zlecone_cwiczenie.deleteOne({id_osoba: parseInt(req.params.idOsoby), id_cwiczenia: parseInt(req.params.idCwiczenie), id_trening: parseInt(req.params.idTrening), cwiczenie_grupowe: true})
        }catch(err){
            res.json({message:err});
        }
    }

    let page = '/api/zlecone_cwiczenie/a_lista_zlecen_grupowych/';
    page += parseInt(req.params.idTrening);
    res.redirect(page);
});


module.exports = router;