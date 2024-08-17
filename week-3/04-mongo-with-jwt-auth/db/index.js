const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://devmalik2211:debu123@cluster0.smnwwnf.mongodb.net/testjwt?');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String,
    
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    id: Number,
    title: String,
    description: String, 
    price: Number, 
    imageLink: String,
    published:Boolean,
    userPurchased: String

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}