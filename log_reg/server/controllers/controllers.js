const bcrypt = require('bcrypt-as-promised');
const Collections = require('../models/models');

const User = Collections.User;
const Secret = Collections.Secret;
const Comment = Collections.Comment;



module.exports = {
    index: (req, res) => {
        res.render('index');
    },

    logout: (req, res) => {
        delete req.session.user_id;
        delete req.session.login;
        req.flash("logout", "You have been logged out!");
        res.redirect('/')
    },

    createMessage: (req, res) => {
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
    },

    showSecrets: (req, res) => {
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
    },

    register: (req, res) => {

    },


    login: (req, res) => {
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
    },

}