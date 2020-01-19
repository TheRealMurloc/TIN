const express = require('express');
const router = express.Router();

const trening_klasyczny = require('../../Table/Trening_klasyczny');
const grupa = require('../../Table/Grupa');
const trener = require('../../Table/Trener');
const osoba = require('../../Table/Osoba');
const obecnosc = require('../../Table/Obecnosc');

let nextId = 2;

function getTreningById(id) {
    return trening_klasyczny.find(element => element.id_trening == id);
}

//Uczestnik lista obecnosci
router.get('/u_lista_obecnosci', (req, res) => {

    let lista = [];
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        let tmp = null;
        if(trening_klasyczny[i].id_grupa === parseInt(req.session.user.id_grupy))
        {
            tmp = trening_klasyczny[i];
            tmp.obecnosc = false;
        }
        for(let j=0; j<obecnosc.length; j++)
        {
            if(obecnosc[j].id_trening === trening_klasyczny[i].id_trening && obecnosc[j].id_uczestnik === parseInt(req.session.user.id_osoby))
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
router.post('/a_lista_obecnosci', (req, res) => {

    let lista = [];
    let idTrening = parseInt(req.body.trening);
    let idGrupa;
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = trening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        if(idGrupa === osoba[i].id_grupy)
        {
            let tmpOsoba = osoba[i];
            tmpOsoba.obecnosc = false;
            tmpOsoba.id_treningu = idTrening;
            for(let j=0; j<obecnosc.length; j++)
            {
                if(obecnosc[j].id_trening === idTrening && obecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
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
router.post('/t_lista_obecnosci', (req, res) => {

    let lista = [];
    let idTrening = parseInt(req.body.trening);
    let idGrupa;
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = trening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        if(idGrupa === osoba[i].id_grupy)
        {
            let tmpOsoba = osoba[i];
            tmpOsoba.obecnosc = false;
            tmpOsoba.id_treningu = idTrening;
            for(let j=0; j<obecnosc.length; j++)
            {
                if(obecnosc[j].id_trening === idTrening && obecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
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
router.get('/a_lista_obecnosci/:id', (req, res) => {

    let lista = [];
    let idTrening = parseInt(req.params.id);
    let idGrupa;
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = trening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        if(idGrupa === osoba[i].id_grupy)
        {
            let tmpOsoba = osoba[i];
            tmpOsoba.obecnosc = false;
            for(let j=0; j<obecnosc.length; j++)
            {
                if(obecnosc[j].id_trening === idTrening && obecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
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
router.get('/t_lista_obecnosci/:id', (req, res) => {

    let lista = [];
    let idTrening = parseInt(req.params.id);
    let idGrupa;
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === idTrening)
        {
            idGrupa = trening_klasyczny[i].id_grupa;
        }
    }
    for(let i=0; i<osoba.length; i++)
    {
        if(idGrupa === osoba[i].id_grupy)
        {
            let tmpOsoba = osoba[i];
            tmpOsoba.obecnosc = false;
            for(let j=0; j<obecnosc.length; j++)
            {
                if(obecnosc[j].id_trening === idTrening && obecnosc[j].id_uczestnik === tmpOsoba.id_osoby)
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

router.get('/a_lista_obecnosci_wybor', (req, res) => {
    res.render('administrator/a_lista_obecnosci_wybor',
        {
            who: 'Administrator',
            trening_klasyczny: trening_klasyczny,
            user: req.session.user
        })
});

router.get('/t_lista_obecnosci_wybor', (req, res) => {

    lista = [];
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trener === parseInt(req.session.user.id_osoby))
        {
            lista.push(trening_klasyczny[i]);
        }
    }
    res.render('trener/t_lista_obecnosci_wybor',
        {
            who: 'Trener',
            trening_klasyczny: lista,
            user: req.session.user
        })
});

router.get('/u_kalendarz_zajec', (req, res) => {

    lista = [];
    for(let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_grupa === parseInt(req.session.user.id_grupy))
        {
            lista.push(trening_klasyczny[i]);
        }
    }

    res.render('uczestnik/u_kalendarz_zajec',
    {
        who: 'Uczestnik',
        trening_klasyczny: lista,
        user: req.session.user
    })
});

router.get('/a_lista_treningow_klasycznych', (req, res) => res.render('administrator/a_lista_treningow_klasycznych',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        user: req.session.user
    }));

router.get('/a_zmiana_treningu_klasycznego/:id', (req, res) => res.render('../views/administrator/a_zmiana_treningu_klasycznego',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        grupa: grupa,
        trener: trener,
        tmpElement: getTreningById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_trening_klasyczny', (req, res) => res.render('administrator/a_trening_klasyczny',
    {
        who: 'Administrator',
        trening_klasyczny: trening_klasyczny,
        grupa: grupa,
        trener: trener,
        user: req.session.user
    }));

// Create
router.post('/', (req, res) => {
    const newTrening = {
        id_trening: nextId++,
        godzina_rozpoczecia: req.body.start,
        godzina_zakonczenia: req.body.end,
        data: req.body.data,
        id_grupa: parseInt(req.body.grupa),
        id_trener: parseInt(req.body.trener)
    }

    trening_klasyczny.push(newTrening);
    res.redirect('../api/trening_klasyczny/a_lista_treningow_klasycznych');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === parseInt(req.params.id))
        {
            trening_klasyczny[i].data = req.body.data;
            trening_klasyczny[i].godzina_rozpoczecia = req.body.start;
            trening_klasyczny[i].godzina_zakonczenia = req.body.end;
            trening_klasyczny[i].id_grupa = req.body.grupa;
            trening_klasyczny[i].id_trener = req.body.trener;
        }
    }
    res.redirect('../../trening_klasyczny/a_lista_treningow_klasycznych');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<trening_klasyczny.length; i++)
    {
        if(trening_klasyczny[i].id_trening === parseInt(req.params.id))
        {
            trening_klasyczny.splice(i, 1);
        }
    }
    res.redirect('../../trening_klasyczny/a_lista_treningow_klasycznych');
});

module.exports = router;