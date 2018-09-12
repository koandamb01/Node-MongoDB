const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const path = require('path');

const Collections = require('./config/mongo_db');
const Message = Collections.Message
const Comment = Collections.Comment

// ########### SETTING MY APP ############# //
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(flash());


// Setup my session
app.use(session({
    secret: '2pacShakur',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// ########### END SETTING MY APP ############# //


// Routes
app.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.log("error while fetching", err);
            res.redirect('/');
        } else {
            res.render('index', { msgs: messages });
        }
    });
});

// create a new message document
app.post('/post_message', (req, res) => {
    // create a new message document
    Message.create(req.body, (err, data) => {
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log('Successfully added a new Mongoose!')
            req.flash("success", "You have Successfully post a new message!");
            res.redirect('/');
        }
    });
});


// create a Comment message document
app.post('/post_comment/:msg_id', (req, res) => {
    // create a new Comment document
    Comment.create(req.body, (err, data) => {
        if (err) {
            for (let key in err.errors) {
                req.flash(key, err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            // find the message that was commented on
            Message.findOneAndUpdate({ _id: req.params.msg_id }, { $push: { comments: data } }, (err, data) => {
                if (err) {
                    console.log("error while fetching", err);
                    res.redirect('/');
                } else {
                    console.log('Successfully added a new Comment!')
                    req.flash("success", "You have Successfully post a new Comment!");
                    res.redirect('/');
                }
            });
        }
    });
});

// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});