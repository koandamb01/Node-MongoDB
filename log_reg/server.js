const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const bodyParser = require('body-parser');


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
    cookie: { maxAge: 6000000000000 }
}));
// ########### END SETTING MY APP ############# //


require('./server/routes/routes')(app);

// Run my server and listen to port 8000
app.listen(8000, () => {
    console.log("Server is running in port 8000");
});