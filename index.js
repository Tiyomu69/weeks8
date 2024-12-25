const mongoose = require('mongoose');

// MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Connecting to MongoDB
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log(`Connected to ${MONGO_URI}`))
    .catch(err => console.error("Error occurred during connection:", err));

const db = mongoose.connection;
db.on('error', (err) => {
    console.error("Connection error:", err);
});

// Creating the schema
const PersonScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    Gender: String,
    Salary: Number
});

// Creating model with collection named as `personCollection`
const person_doc = mongoose.model('modelname', PersonScheme, 'personCollection');

// Creating a single document
const doc1 = new person_doc({
    name: 'Jacky',
    age: 36,
    Gender: "Male",
    Salary: 3456
});

// Adding one document to the collection
doc1
    .save()
    .then((doc1) => {
        console.log("New document added to the database:", doc1);
    })
    .catch((err) => {
        console.error(err);
    });

// Adding multiple documents
const manypersons = [
    { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
    { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
    { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
    { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];

person_doc.insertMany(manypersons)
    .then(() => {
        console.log("Data inserted successfully");
    })
    .catch((error) => {
        console.error("Error inserting data:", error);
    });

// Finding all documents
person_doc.find({})
    .sort({ Salary: 1 }) // Sort ascending by Salary
    .select("name Salary age") // Select name, Salary, and age
    .limit(10) // Limit to 10 items
    .exec()
    .then(docs => {
        console.log("Showing multiple documents:");
        docs.forEach(doc => {
            console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
        });
    })
    .catch(err => {
        console.error("Error finding documents:", err);
    });

// Find users with conditions
const givenage = 30;

person_doc.find({ Gender: "Female", age: { $gte: givenage } })
    .sort({ Salary: 1 }) // Sort ascending by Salary
    .select('name Salary age') // Select name, Salary, and age
    .limit(10) // Limit to 10 items
    .exec()
    .then(docs => {
        console.log("Results for females aged 30 or above:");
        docs.forEach(doc => {
            console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
        });
    })
    .catch(err => {
        console.error("Error finding users:", err);
    });

// Count total documents
person_doc.countDocuments()
    .then(count => {
        console.log("Total document count:", count);
    })
    .catch(err => {
        console.error("Error counting documents:", err);
    });

// Deleting documents
person_doc.deleteMany({ age: { $gte: 25 } })
    .then(result => {
        console.log('Deleted documents:', result);
    })
    .catch(error => {
        console.error("Error deleting documents:", error);
    });

// Updating documents
person_doc.updateMany({ Gender: "Female" }, { Salary: 5555 })
    .then(result => {
        console.log("Updated documents:", result);
    })
    .catch(error => {
        console.error("Error updating documents:", error);
    });