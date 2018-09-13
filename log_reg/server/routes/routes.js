const Controllers = require('../controllers/controllers');
const { body, validationResult } = require('express-validator/check');
// const body = require('express-validator').check({ StopValidationOnfirstError: true })

const { sanitizeBody } = require('express-validator/filter');

const myValidations = [
    body('first_name').isLength({ min: 1 }).withMessage('*First Name is required').isAlpha().withMessage('*Must be alphabet letters'),
    body('Last_name').isLength({ min: 1 }).withMessage('*Last Name is required').isAlpha().withMessage('*Must be alphabet letters'),
    body('email').isLength({ min: 1 }).withMessage('*Email is required').isEmail().withMessage('*Email is invalid'),
    body('password').isLength({ min: 1 }).withMessage('*Password is required')
]



module.exports = (app) => {
    // Routes
    app.get('/', (req, res) => {
        Controllers.index(req, res);
    });

    app.get('/logout', (req, res) => {
        Controllers.logout(req, res);
    });

    // create a new message document
    app.post('/post_secret/:id', (req, res) => {
        Controllers.createMessage(req, res);
    });

    app.get('/secrets', (req, res) => {
        Controllers.showSecrets(req, res);
    });


    app.post('/register', myValidations, (req, res) => {
        try {
            validationResult(req).throw();
            next();
        } catch (err) {

            for (let key in err.mapped()) {
                req.flash(key, err.mapped()[key].msg);
            }
            res.redirect('/');
        }

        // Controllers.register(req, res);
    });


    // login
    app.post('/login', (req, res) => {
        Controllers.login(req, res);
    });
};