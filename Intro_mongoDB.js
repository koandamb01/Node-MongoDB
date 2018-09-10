// Create a database called 'my_first_db'.
use my_first_db

// Create students collection.
db.createCollection('students')

// Each document you insert into this collection should have the following format: 
// ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
db.students.insert({ name: 'Mohamed', home_state: 'New York', lucky_number: 11, birthday: { month: 04, day: 11, year: 1995 } })
db.students.insert({ name: 'Momo', home_state: 'Ohio', lucky_number: 10, birthday: { month: 01, day: 10, year: 1995 } })
db.students.insert({ name: 'Moussa', home_state: 'Washington', lucky_number: 01, birthday: { month: 01, day: 01, year: 1972 } })
db.students.insert({ name: 'David', home_state: 'California', lucky_number: 05, birthday: { month: 11, day: 26, year: 1997 } })
db.students.insert({ name: 'Latifa', home_state: 'New Jersey', lucky_number: 23, birthday: { month: 12, day: 16, year: 2000 } })

// Get all students.
db.students.find()

// Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
db.students.find({ $or: [{ home_state: 'New York' }, { home_state: "New Jersey" }] })

// Get all students whose lucky number is:
db.students.find({ lucky_number: { $gt: 3 } }) // greater than 3
db.students.find({ lucky_number: { $lte: 10 } }) // less than or equal to 10
db.students.find({ lucky_number: { $gte: 1, $lte: 9 } }) // between 1 and 9 (inclusive)

// Add a field to each student collection called 'interests' that is an ARRAY.  
// It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
db.students.find().forEach(function (myDoc) { db.students.update(myDoc, { $set: { interests: ['coding', 'brunch', 'MongoDB'] } }) }) OR
db.students.update({}, { $set: { interests: ['coding', 'brunch', 'MongoDB'] } })

// Add some unique interests for each particular student into each of their interest arrays.
db.students.update({ name: "Moussa" }, { $push: { interests: 'Shopping' } })
db.students.update({ name: "Mohamed" }, { $push: { interests: 'Soccer' } })

// Add the interest 'taxes' into someone's interest array.
db.students.update({ name: "Momo" }, { $push: { interests: 'taxes' } })

// Remove the 'taxes' interest you just added.
db.students.update({ name: "Momo" }, { $pull: { interests: 'taxes' } })

// Remove all students who are from California (or Washington).
db.students.remove({ $or: [{ home_state: 'California' }, { home_state: "Washington" }] })

// Remove a student by name. 
db.students.remove({ name: 'David' }, true)

// Remove a student whose lucky number is greater than 5 (JUST ONE)
db.students.remove({ lucky_number: { $gt: 5 } }, true)

// Add a field to each student collection called 'number_of_belts' and set it to 0.
db.students.update({}, { $set: { number_of_belts: 0 } }, { multi: true })

// Rename the 'number_of_belts' field to 'belts_earned'
db.students.updateMany({}, { $rename: { 'number_of_belts': 'belts_earned' } })

// Increment this field by 1 for all students in Washington (Seattle Dojo).
db.students.updateMany({}, { $set: { belts_earned: 1 } })

// Remove the 'lucky_number' field.
db.students.updateMany({}, { $unset: { lucky_number: '' } })

// Add a 'updated_on' field, and set the value as the current date.
db.students.updateMany({}, { $set: { updated_on: new Date() } })


