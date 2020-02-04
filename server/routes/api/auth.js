const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check} = require('express-validator');
const {userAuth, userRegister, userFind, userConfirm} = require('../../controllers/auth.controller')

// @route  GET api/auth
// @desc   Find and return user data
// @access Private
router.get(
    '/',
    auth,
    userFind   
)

// @route  POST api/auth/login
// @desc   Auth User and get token
// @access Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter the pass').exists()
    ],
    userAuth
)

// @route  POST api/auth/register
// @desc   Register User
// @access Public
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter the pass with 6 or more characters').isLength({min:6})
    ],
    userRegister
)


// @route  POST api/auth/confirm/:id
// @desc   Confirm user via email
// @access Public
router.get(
    '/confirm/:id',
    userConfirm
)

module.exports = router;