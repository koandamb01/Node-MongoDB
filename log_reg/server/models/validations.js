// const validate = require('mongoose-validator')

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 255],
        message: 'Name should be between {ARGS[2]} and {ARGS[255]} characters',
    }),
    validate({
        validator: 'isString',
        message: '*Alphabets characters only',
    }),
];

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    }),
]


module.exports = {
    nameValidator: nameValidator,
    emailValidator: emailValidator
};