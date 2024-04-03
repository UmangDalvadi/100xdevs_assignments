const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    await User.create({
        username: req.body.username,
        password: req.body.password
    })

    res.json({
        message: 'User created successfully'
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    const allCourses = await Course.find({})

    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    await User.updateOne({
        username: req.headers.username
    }, {
        "$push": {
            purchasedCourse: req.params.courseId
        }
    })

    res.json({
        message: 'Course purchased successfully'
    })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({
        username: req.headers.username
    })

    const purchases = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    })

    res.json({
        purchasedCourse: purchases
    })

});

module.exports = router