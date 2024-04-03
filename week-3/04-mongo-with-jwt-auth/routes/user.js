const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    username = req.body.username;
    password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({
        message: 'User created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    username = req.body.username;
    password = req.body.password;

    const isValidate = await User.findOne({
        username,
        password
    })

    if (isValidate) {
        const token = jwt.sign({ username }, jwtPassword);
        res.json({
            token: `Bearer ${token}`
        })
    } else {
        res.status(411).json({
            message: 'Incorrect username or password!!'
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});

    res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    await User.updateOne({
        username: req.username
    }, {
        "$push": {
            purchasedCourses: req.params.courseId
        }
    })

    res.json({
        message: 'Course purchased successfully'
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const findUser = await User.findOne({
        username: req.username
    })

    const purchased = await Course.findOne({
        _id: {
            "$in": findUser.purchasedCourses
        }
    })

    res.json({
        purchasedCourses: purchased
    })
});

module.exports = router