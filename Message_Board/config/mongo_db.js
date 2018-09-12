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


// export my quotes
const Message = mongoose.model('Message', MessageSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    Message: Message,
    Comment: Comment
}