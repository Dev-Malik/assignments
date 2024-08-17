const { Router } = require("express");
const router = Router();
const {User} = require("../db");
const {Course} = require("../db");

const userMiddleware = require("../middleware/user");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username  = req.body.username;
    const password  = req.body.password;
    if(!username || !password){
        return res.status(400).json({message: "Username and password are required"});
    }
    const user = new User({username, password});
    await user.save();
    res.json({
        message : "User created successfully"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.json({ courses: courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.findOne({ id: courseId });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    course.userPurchased.push({ username: username });
    await course.save();
    
    res.json({ message: "Course purchased successfully" });




});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const purchasedCourses = await Course.find({ 'userPurchased.username': username });
    res.json({ purchasedCourses: purchasedCourses });


});

module.exports = router