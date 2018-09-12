const Mongoose = require('../models/models');

module.exports = {
    index: (req, res) => {
        Mongoose.find({}, (err, data) => {
            if (err) {
                console.log("error while fetching", err);
                res.redirect('/');
            } else {
                res.render('index', { mongooses: data });
            }
        });
    },

    show_mongoose: (req, res) => {
        const id = req.params.id;
        Mongoose.findOne({ _id: id }, (err, data) => {
            if (err) {
                console.log("error while fetching", err);
                res.redirect('/');
            } else {
                res.render('show', { mongoose: data });
            }
        });
    },

    edit_mongoose: (req, res) => {
        const id = req.params.id;
        Mongoose.findOne({ _id: id }, (err, data) => {
            if (err) {
                console.log("error while fetching", err);
                res.redirect('/');
            } else {
                res.render('edit', { mongoose: data });
            }
        });
    },

    process_new_mongoose: (req, res) => {
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
    },

    delete_mongoose: (req, res) => {
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
    },

    update_mongoose: (req, res) => {
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
    }
}