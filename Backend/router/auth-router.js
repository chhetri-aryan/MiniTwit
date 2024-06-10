const express = require('express');
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const schema = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware")
const authMiddleware = require("../middleware/auth-middleware")
const postcontroller = require('../controllers/post-controller')

router.route('/').get(authcontrollers.home)

router.route('/register')
    .post(validate(schema.signupSchema), authcontrollers.register)

router.route('/login')
    .post(validate(schema.loginSchema), authcontrollers.login)

router.route('/user').get(authMiddleware, authcontrollers.user);

router.route('/alluser').get(authcontrollers.allUser);

router.route('/followstatus/:id').put(authcontrollers.updateFollowing)

router.route('/post')
    .post(postcontroller.createPost)
    .get(postcontroller.fetchPost)

router.route('/post/:id')
    .put(postcontroller.updatePost)
    .delete(postcontroller.deletePost)



module.exports = router;