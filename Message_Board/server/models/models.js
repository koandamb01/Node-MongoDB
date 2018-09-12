const mongoose = require('../config/mongoose');
// Comment Schema
const CommentSchema = new mongoose.Schema({
    commentor: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
        minlength: [3, "Comment must be at least 3 characters"]
    }
}, { timestamps: true });


// Message Schema
const MessageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [3, "Message must be at least 3 characters"]
    },
    comments: [CommentSchema]
}, { timestamps: true });

module.exports = {
    Message: mongoose.model('Message', MessageSchema),
    Comment: mongoose.model('Comment', CommentSchema)
}