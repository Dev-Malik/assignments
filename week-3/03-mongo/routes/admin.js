const { Router } = require("express");
const { Admin } = require("../db");
const { Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.status(400).json({message: "Username and password are required"});
    }
    // Create a new admin user
    const admin = new Admin({username, password});
    await admin.save()
    res.send({ message: 'Admin created successfully' });
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

    res.send({ message: 'Course created successfully' });

    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json({ course: courses });


});

module.exports = router;