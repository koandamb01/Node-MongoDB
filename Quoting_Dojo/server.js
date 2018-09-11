const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const path = require('path');
const Quote = require('./config/mongoDB');
const moment = require('moment');

// ########### SETTING MY APP ############# //
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(flash());


// Setup my session
app.use(session({
    secret: '2pacShakur',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// ########### END SETTING MY APP ############# //


// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/quotes', (req, res) => {
    // get all the quotes
    Quote.find({}, (err, data) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {
            res.render('quotes', { quotes: data, moment: moment });
        }
    });
});

// Post request to insert data to the database
app.post('/quotes', (req, res) => {
    console.log("form data: " + req.body);

    // get a new quote object
    const quote = new Quote();

    // insert data now
    quote.name = req.body.name;
    quote.quote = req.body.quote;
    // now save to the database
    quote.save((err) => {
        // check if there is error
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log('Successfully added a new Quote!')
            res.redirect('/');
        }
    });
});




// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});