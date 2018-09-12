const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const path = require('path');

const Collections = require('./config/mongo_db');
const User = Collections.User;
const Secret = Collections.Secret;
const Comment = Collections.Comment;


// ########### SETTING MY APP ############# //
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(flash());


// Setup my session
app.use(session({
    secret: '2pacShakur',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000000000 }
}));
// ########### END SETTING MY APP ############# //


// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/logout', (req, res) => {
    delete req.session.user_id;
    delete req.session.login;
    req.flash("logout", "You have been logged out!");
    res.redirect('/')
});



// create a new message document
app.post('/post_secret/:id', (req, res) => {
    // create a new message document
    Secret.create(req.body, (err, secret) => {
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/secrets');
        }
        else {
            User.findOneAndUpdate({ _id: req.params.id }, { $push: { secrets: secret } }, (err) => {
                if (err) {
                    console.log("error while fetching", err);
                    res.redirect('/secrets');
                } else {
                    console.log('Successfully added a new Secret!')
                    req.flash("success", "You have Successfully post a new secret!");
                    res.redirect('/secrets');
                }
            });
        }
    });
});



app.get('/secrets', (req, res) => {
    // find user
    if (!req.session.login) {
        req.flash("logout", "You have been logged out!");
        res.redirect('/');
    }
    User.findOne({ _id: req.session.user_id }, (err, user) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {

            // fetch all the secrets
            Secret.find({}, (err, secrets) => {
                if (err) {
                    console.log("error while fetching", err);
                    res.redirect('/');
                } else {
                    res.render('secrets', { user: user, secrets: secrets });
                }
            });
        }
    });
});

app.post('/register', (req, res) => {
    // hash the pw first
    bcrypt.hash(req.body.password, 10).then(hash_password => {
        req.body.password = hash_password;
        // create a new user
        User.create(req.body, (err, user) => {
            if (err) {
                for (let key in err.errors) {
                    req.flash(key, err.errors[key].message);
                }
                res.redirect('/');
            }
            else {
                console.log('Successfully added a new User!')
                req.flash("register", "You have Successfully post a new User!");
                req.session.user_id = user.id;
                req.session.login = true;
                res.redirect('/secrets');
            }
        });

    }).catch(error => {
        console.log("error hash: " + error);
    });
});



// login
app.post('/login', (req, res) => {
    // find user first
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        }
        else if (user) {
            // check password for matching
            bcrypt.compare(req.body.password, user.password).then(result => {
                // check if password match
                req.session.user_id = user.id;
                req.session.login = true;
                res.redirect('/secrets');

            }).catch(error => {
                console.log("error hash: " + error);
                req.flash("login", "Email or password invalid!");
                res.redirect('/');
            });
        }
        else {
            req.flash("login", "Email or password invalid!");
            res.redirect('/');
        }
    });
});



// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});