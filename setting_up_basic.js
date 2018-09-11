const mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("moongose is now connected!")
});

const emailRegex = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, "Name must least 5 character"],
        maxlength: [10, "Name must less 255 character"]
    },

    email: {
        type: String,
        required: [true, "*Email address is required"],
        trim: true,
        lowercase: true,
        match: [emailRegex, "*Email address is invalid"]
    },

    age: {
        type: Number,
        min: [4, 'Too few bro'],
        max: [8, 'too many bro']
    },
    Home_town: String,
    phone: String

}, { timestamps: true });

// mongoose.Promise = global.Promise;
module.exports = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'


// // ...create a new instance of the User Schema and save it to the DB.
var userInstance = new User()
userInstance.name = 'Andriana'
userInstance.age = 29
userInstance.save(function (err) {
    // This code will run when Mongo has attempted to save the record.
    // If (err) exists, the record was not saved, and (err) contains validation errors.
    // If (err) does not exist (undefined), Mongo saved the record successfully.
})

// Finding all users based on a requirement
// ...retrieve all records matching {name:'Jessica'}
User.find({ name: 'Jessica' }, function (err, users) {
    // Retrieve an array of users matching the name. Even if 1 record is found, the result will be an array the size of 1, with 1 object inside. (Notice, if we are expecting to retrieve one record, we may want to use findOne and retrieve the object as oppose to an array the size of one.
    // This code will run when the DB is done attempting to retrieve all matching records to {name:'Jessica'}
})


// Finding one user
// ...retrieve 1 record (the first record found) matching {} copy
User.findOne({}, function (err, user) {
    // Retrieve 1 object
    // This code will run when the DB is done attempting to retrieve 1 record.
})


// Delete all users
// ...delete all records of the User Modelcopy
User.remove({}, function (err) {
    // This code will run when the DB has attempted to remove all matching records to {}
});

// Delete one user 
// ...delete 1 record by a certain key/value.
User.remove({ _id: 'insert record unique id here' }, function (err) {
    // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
});

// Update any records
// ...update any records that match the query
User.update({ name: 'Andriana' }, { $push: { pets: { name: 'Skippy', type: 'cactus' } } }, function (err) {
    // This code will run when the DB has attempted to update the matching record.copy
})

// another way to update a record
User.find({ name: 'Andriana' }, function (err, user) {
    user.name = 'Andri';
    user.pets.push({ name: 'Skippy', type: 'cactus' });
    user.save(function (err) {
        // if save was successful awesome!
    })
})