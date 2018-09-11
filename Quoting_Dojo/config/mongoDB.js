const mongoose = require('mongoose');

// connect to the mongodb
mongoose.connect('mongodb://localhost/quotes_db');
const db = mongoose.connection;
db.on('error', (error) => {
    console.log("error during connection: ", error);
});

db.on('open', () => {
    console.log("mongoose is now connected!");
});

// create my schema
const QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "*Name is required"],
        minlength: [2, "*Name must be at least 2 characters"],
        maxlength: [255, "*Name must be at less 255 characters"],
    },
    quote: {
        type: String,
        required: [true, "*Quote is required"],
        minlength: [5, "Quotes must be at least 5 characters"],
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// export my quotes
module.exports = mongoose.model('Quote', QuoteSchema);
