const Quote = require('./mongoDB');
const moment = require('moment');

module.exports = (app) => {
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
}
