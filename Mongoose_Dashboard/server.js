const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const path = require('path');
const Mongoose = require('./config/mongo_db');

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
    Mongoose.find({}, (err, data) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {
            res.render('index', { mongooses: data });
        }
    });
});

app.get('/mongooses/new', (req, res) => {
    res.render('new');
});

app.get('/mongooses/:id', (req, res) => {
    const id = req.params.id;
    Mongoose.findOne({ _id: id }, (err, data) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {
            res.render('show', { mongoose: data });
        }
    });
});



app.get('/mongooses/edit/:id', (req, res) => {
    const id = req.params.id;
    Mongoose.findOne({ _id: id }, (err, data) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {
            res.render('edit', { mongoose: data });
        }
    });
});


//  add new mongoose to the database
app.post('/mongooses', (req, res) => {
    // create a new mongoose
    const mongoose = new Mongoose();
    mongoose.name = req.body.name;
    mongoose.age = req.body.age;
    mongoose.height = req.body.height;

    mongoose.save((err) => {
        // check if there is error
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/mongooses/new');
        }
        else {
            console.log('Successfully added a new Mongoose!')
            req.flash("add", "You have Successfully add a new mongoose!");
            res.redirect('/');
        }
    });
});


// Delete a mongoose
app.post('/mongooses/destroy/:id', (req, res) => {
    const id = req.params.id;
    // remove a mongoose from the database base on their id
    Mongoose.remove({ _id: id }, (err) => {
        if (err) {
            console.log("error while removing data", err);
            res.redirect('/');
        } else {
            req.flash("delete", "You have Successfully remove a mongoose!");
            res.redirect('/');
        }
    });
});


// Update mongoose information
app.post('/mongooses/:id', (req, res) => {
    const id = req.params.id;
    Mongoose.findOneAndUpdate({ _id: id }, { $set: { name: req.body.name, age: req.body.age, height: req.body.height } }, { runValidators: true }, (err) => {
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/mongooses/new');
        }
        else {
            console.log('Successfully updated a Mongoose!')
            req.flash("add", "You have Successfully update a mongoose info!");
            res.redirect('/');
        }
    });
});


// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});