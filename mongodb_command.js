// CREATE - Inserting a document into a collection:
db.ninjas.insert({ name: "Trey", belt: "black", status: "awesome" })

// To retrieve documents from your collections, you will use the following method.
db.COLLECTION_NAME.find({ YOUR_QUERY_DOCUMENT })
db.ninjas.find({ name: "Trey" })

// MongoDB by default returns as many results as it can. If you want to just find all of the given collection, 
// you can pass an empty object to the .find method; or you can just not pass anything at all.
db.ninjas.find({})
db.ninjas.find() OR db.ninjas.find().pretty()

// the MongoDB ObjectId, which MongoDB will automatically make for you if you do not specify a value for _id. 
// To query by id, you have to do the following:
db.ninjas.find({ _id: ObjectId("5462a78e514e258182f4c69a") })
// Notice: You can't just pass the string of characters, you must pass it as an ObjectId.

// DESTROY - Removing documents from a collection:
// To remove an item from the database, we would run the following syntax:
// Pattern:
db.COLLECTION_NAME.remove({ YOUR_QUERY_DOCUMENT }, BOOLEAN)
// Example
db.ninjas.remove({ belt: "yellow" }) // this will remove all documents that matches
db.ninjas.remove({ belt: "yellow" }, false) // this query would have the same effect as the one above.
db.ninjas.remove({ belt: "yellow" }, true) // this will only remove the first one find

// MongoDB's native update method will completely overwrite everything except the _id field when we run the way shown above.  
// If we wanted to run the update to only add to the document, (not overwrite it) 
// we would run the following (let's pretend we didn't run the query that erased all of our data):
db.ninjas.update({ name: "Trey" }, { $set: { location: "Mountain View" } })

// Here is a chart of the most frequently-used operators (take some time to play around with them):
// I wanted to get all the Dojos whose number of students is greater than 15, I would run the following:
db.dojos.find({ number_of_students: { $gt: 15 } })

//name	            description
$gt     //(greater than)	Use to query selectively on numerical-valued fields
$gte    //(greater than or equal to)	Use to query selectively on numerical-valued fields
$lt     //(less than)	Use to query selectively on numerical-valued fields
$lte    //(less than or equal to)	Use to query selectively on numerical-valued fields
$in     //(in array)	Use to find documents who have a particular value within an array.

// And we wanted to add an element in the interests array. The operator we would use is called the $push operator, which should sound very familiar. 
// To add the interest 'snowboarding' to the student document, we would run...
db.students.update({ _id: ObjectId("5463d871a6a96d5ed6252f4d") }, { $push: { interests: 'snowboarding' } })

// The $push operator is a key of the update document, and its value is another document with a key of interests, and a value of 'snowboarding'.

// Name	    Description
$push	//  Push to an array contained within a document.
$pop	//  Removes either the first or last element from an array. EX:
db.COLLECTION.update({ QUERY }, { $pop: { array_key: (1 or -1)}})
// Use 1 for the last item in the array, -1 for the first item.

$addToSet	//It functions just like $push.  However, $addToSet only adds to the specified array if the value doesn't already exist (thereby preventing duplicate entries).
$pull	//  Removes a specified value from an array, unlike $pop, which removes by location. Ex:
db.COLLECTION.update({ QUERY }, { $pull: { array_key: VALUE } })
//   This will remove all instances of VALUE from the documents with the array specified by the array_key that match QUERY.

// The following example invokes the forEach() method on the cursor returned by find() to print the name of each user in the collection:
db.users.find().forEach(function (myDoc) { print("user: " + myDoc.name); });
