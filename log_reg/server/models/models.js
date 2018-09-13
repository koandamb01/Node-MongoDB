const mongoose = require('./mongoose');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Comment Schema
const CommentSchema = new mongoose.Schema({
    comment: String
}, { timestamps: true });

// Message Schema
const SecretSchema = new mongoose.Schema({
    secret: String,
    comments: [CommentSchema]
}, { timestamps: true });

// User Schema
const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    birthday: Date,
    password: String,
    secrets: [SecretSchema]

}, { timestamps: true });

module.exports = {
    User: mongoose.model('User', UserSchema),
    Secret: mongoose.model('Secret', SecretSchema),
    Comment: mongoose.model('Comment', CommentSchema)
};