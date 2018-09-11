const mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

const emailRegex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, "Name must least 5 character"],
        maxlength: [10, "Name must less 255 character"]
    },

    email: {
        type: String,
        required: [true, "*Email address is required"],
        trim: true,
        lowercase: true,
        match: [emailRegex, "*Email address is invalid"]
    },

    age: {
        type: Number,
        min: [4, 'Too few bro'],
        max: [8, 'too many bro']
    },
    Home_town: String,
    // phone: String
});


// mongoose.Promise = global.Promise;
module.exports = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
