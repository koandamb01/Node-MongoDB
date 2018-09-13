const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect to the mongodb
mongoose.connect('mongodb://localhost/basic_mongoose');
const db = mongoose.connection;
db.on('error', (error) => {
    console.log("error during connection: ", error);
});

db.on('open', () => {
    console.log("mongoose is now connected!");
});

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', UserSchema);

// ########### SETTING MY APP ############# //
const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: users })
        }
    })
});

app.get('/:name', (req, res) => {
    User.findOne({ name: req.params.name }, (err, users) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: users })
        }
    })
});

app.get('/new/:name', (req, res) => {
    User.create({ name: req.params.name }, (err, users) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: users })
        }
    })
});

app.get('/remove/:name', (req, res) => {
    User.remove({ name: req.params.name }, (err, users) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: users })
        }
    })
});



// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});