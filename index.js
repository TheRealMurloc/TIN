const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const osoba = require('./Table/Osoba');
const grupa = require('./Routes/api/grupa');


const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/administrator/a_lista_osob', (req, res) => res.render('administrator/a_lista_osob',
    {
        who: 'Administrator',
        osoba: osoba
    }));






// Api routes
app.use('/api/osoba', require('./routes/api/osoba'));
app.use('/api/grupa', require('./routes/api/grupa'));
app.use('/api/cwiczenia', require('./routes/api/cwiczenia'));


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));