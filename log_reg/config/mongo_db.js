const mongoose = require('mongoose');

// connect to the mongodb
mongoose.connect('mongodb://localhost/mongoose_db');
const db = mongoose.connection;
db.on('error', (error) => {
    console.log("error during connection: ", error);
});

db.on('open', () => {
    console.log("mongoose is now connected!");
});

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// User Schema
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "*First Name is required"],
        minlength: [2, "*Must be at least 2 characters"],
        maxlength: [255, "*Must be less than 255 characters"]
    },

    last_name: {
        type: String,
        required: [true, "*Last Name is required"],
        minlength: [2, "*Must be at least 2 characters"],
        maxlength: [255, "*Must be less than 255 characters"]
    },

    email: {
        type: String,
        required: [true, "*Email address is required"],
        unique: [true, "*Email already exist"],
        trim: true,
        lowercase: true,
        match: [emailRegex, "*Email address is invalid"]
    },

    birthday: {
        type: Date,
        required: [true, "*Birthday is required"]
    },
    password: {
        type: String,
        required: [true, "*Password is required"],
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


