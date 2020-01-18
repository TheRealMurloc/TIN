const express = require('express');
const router = express.Router();

const osoba = require('../../Table/Osoba');
const grupa = require('../../Table/Grupa');
const trener = require('../../Table/Trener');
const uczestnik = require('../../Table/Uczestnik');

let nextId = 4;

function getOsobaById(id) {
    return osoba.find(element => element.id_osoby == id);
}

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

router.get('/a_lista_osob', (req, res) => res.render('administrator/a_lista_osob',
    {
        who: 'Administrator',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/a_zmiana_osoby/:id', (req, res) => res.render('administrator/a_zmiana_osoby',
    {
        who: 'Administrator',
        osoba: osoba,
        grupa: grupa,
        tmpElement: getOsobaById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_szczegoly_osoby/:id', (req, res) => res.render('administrator/a_szczegoly_osoby',
    {
        who: 'Administrator',
        osoba: osoba,
        grupa: grupa,
        tmpElement: getOsobaById(parseInt(req.params.id)),
        user: req.session.user
    }));

router.get('/a_dodaj_uczestnika', (req, res) => res.render('administrator/a_dodaj_uczestnika',
    {
        who: 'Administrator',
        osoba: osoba,
        grupa: grupa,
        user: req.session.user
    }));

router.get('/a_zmiana_hasla', (req, res) => res.render('administrator/a_zmiana_hasla',
    {
        who: 'Administrator',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/t_zmiana_hasla', (req, res) => res.render('trener/t_zmiana_hasla',
    {
        who: 'Trener',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/u_zmiana_hasla', (req, res) => res.render('uczestnik/u_zmiana_hasla',
    {
        who: 'Uczestnik',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/t_zmiana_ksywki', (req, res) => res.render('trener/t_zmiana_ksywki',
    {
        who: 'Trener',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/u_zmiana_ksywki', (req, res) => res.render('uczestnik/u_zmiana_ksywki',
    {
        who: 'Uczestnik',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/t_zmiana_email', (req, res) => res.render('trener/t_zmiana_email',
    {
        who: 'Trener',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/u_zmiana_email', (req, res) => res.render('uczestnik/u_zmiana_email',
    {
        who: 'Uczestnik',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/t_zmiana_tel', (req, res) => res.render('trener/t_zmiana_tel',
    {
        who: 'Trener',
        osoba: osoba,
        user: req.session.user
    }));

router.get('/u_zmiana_tel', (req, res) => res.render('uczestnik/u_zmiana_tel',
    {
        who: 'Uczestnik',
        osoba: osoba,
        user: req.session.user
    }));


router.post('/login', (req, res) =>
    {
        let user = null;
        for(let i=0; i < osoba.length; i++)
        {
            if(osoba[i].login === req.body.login)
            {
                user = osoba[i];
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



// Gets All
router.get('/', (req, res) => {
    res.json(osoba);
});

// Get single
router.get('/:id', (req, res) => {
    const found = osoba.some(osoba => osoba.id_osoby === parseInt(req.params.id));

    if(found){
        res.json(osoba.filter(osoba => osoba.id_osoby === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});

// Create
router.post('/', (req, res) => {
    let newOsoba;
    if(req.body.rola == "trener")
    {
        newOsoba = {
            id_osoby: nextId++,
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
        }
    }
    if(req.body.rola == "uczestnik")
    {
        newOsoba = {
            id_osoby: nextId++,
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
        }
    }

    if(!newOsoba.login) {
        res.status(400).json({ msg: 'Wpisz login'});
        nextId--;
    } else {
        osoba.push(newOsoba);
    }
    if(trener)
    {
        const newTrener = {
            id_trener: newOsoba.id_osoby
        }
        trener.push(newTrener);
    }
    if(uczestnik)
    {
        const newUczestnik = {
            id_uczestnik: newOsoba.id_osoby
        }
        uczestnik.push(newUczestnik);
    }
    res.redirect('/api/osoba/a_lista_osob');
});

// Update
router.post('/update/:id', (req, res) => {
    for( let i=0; i<osoba.length; i++)
    {
        if(osoba[i].id_osoby === parseInt(req.params.id))
        {
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
            osoba[i].login = req.body.login ? req.body.login : osoba[i].login;
            osoba[i].haslo = req.body.haslo ? req.body.haslo : osoba[i].haslo;
            osoba[i].imie = req.body.imie ? req.body.imie : osoba[i].imie;
            osoba[i].nazwisko = req.body.nazwisko ? req.body.nazwisko : osoba[i].nazwisko;
            osoba[i].ksywka = req.body.ksywka ? req.body.ksywka : osoba[i].ksywka;
            osoba[i].email = req.body.email ? req.body.email :  osoba[i].email;
            osoba[i].telefon = req.body.telefon ? req.body.telefon : osoba[i].telefon;
            osoba[i].id_grupy = parseInt(req.body.grupa) ? parseInt(req.body.grupa) : osoba[i].id_grupy;
            osoba[i].czyTrener = trener;
            osoba[i].czyUczestnik = uczestnik;
        }
    }
    if(req.session.user.czyUczestnik)
        res.redirect('/api/osoba/u_strona_glowna');
    if(req.session.user.czyTrener)
        res.redirect('/api/osoba/t_strona_glowna');
    if(req.session.user.czyAdmin)
        res.redirect('/api/osoba/a_lista_osob');
});

// Delete
router.post('/delete/:id', (req, res) => {
    for( let i=0; i<osoba.length; i++)
    {
        if(osoba[i].id_osoby === parseInt(req.params.id))
        {
            osoba.splice(i, 1);
        }
    }
    nextId--;
    res.redirect('../../osoba/a_lista_osob');
});


module.exports = router;