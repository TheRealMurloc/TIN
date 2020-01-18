const express = require('express');
const router = express.Router();
const obecnosc = require('../../Table/Obecnosc');


function getTreningById(id) {
    return trening_klasyczny.find(element => element.id_trening == id);
}

// Update admin
router.get('/administrator/:id/:trening', (req, res) => {
    let nieobecny = true;
    for(let i=0; i<obecnosc.length; i++)
    {
        if(obecnosc[i].id_uczestnik === parseInt(req.params.id) && obecnosc[i].id_trening === parseInt(req.params.trening))
        {
            obecnosc.splice(i, 1);
            nieobecny = false;
        }
    }
    if(nieobecny)
    {
        let newObecnosc = {
            id_trening: parseInt(req.params.trening),
            id_uczestnik: parseInt(req.params.id)
        }
        obecnosc.push(newObecnosc);
    }

    let page = '/api/trening_klasyczny/a_lista_obecnosci/';
    page += parseInt(req.params.trening);

    res.redirect(page);
});

// Update trener
router.get('/trener/:id/:trening', (req, res) => {
    let nieobecny = true;
    for(let i=0; i<obecnosc.length; i++)
    {
        if(obecnosc[i].id_uczestnik === parseInt(req.params.id) && obecnosc[i].id_trening === parseInt(req.params.trening))
        {
            obecnosc.splice(i, 1);
            nieobecny = false;
        }
    }
    if(nieobecny)
    {
        let newObecnosc = {
            id_trening: parseInt(req.params.trening),
            id_uczestnik: parseInt(req.params.id)
        }
        obecnosc.push(newObecnosc);
    }

    let page = '/api/trening_klasyczny/t_lista_obecnosci/';
    page += parseInt(req.params.trening);

    res.redirect(page);
});

module.exports = router;