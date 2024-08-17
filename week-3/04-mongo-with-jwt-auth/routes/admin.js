const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const router = Router();
const { Admin } = require("../db");
const { Course } = require("../db");
const jwtSecret= 'secret';
// Admin Routes
router.post('/signup',  async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    if(!username || !password){
        return res.status(400).json({message: "Username and password are required"});
    }
    const alrExists = await Admin.findOne({ username: username });
    if (alrExists) {
         return res.status(400).json({ message: "Username already exists" });
     }
    // Create a new admin user
    const admin = new Admin({username, password});
    await admin.save()
    res.send({ message: 'Admin created successfully' });

});

router.post('/signin' , async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const admin = await Admin.findOne({username});
    if (!admin) {
        return res.status(400).json({ message: "Invalid username or password" });
        }
    const token = jwt.sign({ username: admin.username }, jwtSecret);
    res.json({token: token})


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;
    const latestCourse = await Course.findOne().sort('-id');
    const newId = latestCourse ? latestCourse.id + 1 : 1;

    if (!title || !description || !price || !imageLink) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    // Create a new course
    const newCourse = new Course({ id: newId,
        title, 
        description, 
        price, 
        imageLink,
        published : true });
    await newCourse.save();
    res.status(200).json({message : "course added successfully"})
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json({ course: courses });
});

module.exports = router;