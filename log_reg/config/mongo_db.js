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

// Comment Schema
const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [3, "Comment must be at least 3 characters"]
    }
}, { timestamps: true });

// Message Schema
const SecretSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: [true, "Secret is required"],
        minlength: [3, "Secret must be at least 3 characters"]
    },

    comments: [CommentSchema]

}, { timestamps: true });

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
    },

    secrets: [SecretSchema]

}, { timestamps: true });

module.exports = {
    User: mongoose.model('User', UserSchema),
    Secret: mongoose.model('Secret', SecretSchema),
    Comment: mongoose.model('Comment', CommentSchema)
};