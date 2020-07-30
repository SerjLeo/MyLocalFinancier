const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const auth = require('../../middleware/auth')
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../../controllers/profileController.js')

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get(
    '/me',
    auth,
    getProfile
);

// @route  POST api/profile
// @desc   Create or update users profile
// @access Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'name is required').not().isEmpty()
        ]
    ],
    updateProfile
);

// @route  DELETE api/profile
// @desc   Delete profile
// @access Private
router.delete(
    '/',
    auth,
    deleteProfile
)

module.exports = router;