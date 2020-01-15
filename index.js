const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const router = express.Router();


const app = express();

// Handlebars Middleware
const hbs = exphbs.create({
    defaultLayout: 'main',

    helpers: {
        mnozenie: function (x, y) {
            return x * y;
        },
        dzielenie: function (x, y) {
            return x / y;
        },
        procent: function (x, y) {
            return x / y * 100;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//session
app.use(session({
    secret: 'Secret password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 20 * 60 * 1000 // (20 min)
    }
}));

// Api routes
app.use('/api/osoba', require('./routes/api/osoba'));
app.use('/api/grupa', require('./Routes/api/grupa'));
app.use('/api/cwiczenia', require('./routes/api/cwiczenia'));
app.use('/api/trening_internetowy', require('./routes/api/trening_internetowy'));
app.use('/api/trening_klasyczny', require('./routes/api/trening_klasyczny'));
app.use('/api/feedback', require('./routes/api/feedback'));
app.use('/api/zlecone_cwiczenie', require('./routes/api/zlecone_cwiczenie'));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//index route
router.get('/', (req, res) => res.render('index.html', {}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));