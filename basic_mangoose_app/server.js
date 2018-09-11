const express = require('express');
const bodyParser = require('body-parser');
const User = require('./config/mongoDB')
const flash = require('express-flash');
const path = require('path');
const session = require('express-session');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Require path
app.use(express.static(path.join(__dirname, './static')));
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

// Routes
// Root Request
app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log("my Users: ", users),
                res.render('index', { users: users });
        }
    });
});

// Add User Request 
app.post('/users', function (req, res) {
    console.log("POST DATA", req.body);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        home_town: req.body.home
    });

    user.save(function (err) {
        if (err) {
            console.log('Error: ' + err);
            for (let key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log('Successfully added a new user!')
            res.redirect('/');
        };
    });
});







// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})