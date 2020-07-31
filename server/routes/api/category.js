const express = require('express');
const router = express.Router();
const {
    deleteCategory,
    getCategoryByID,
    addCategory,
    getCategories,
    createDefaultCategories
} = require('../../controllers/category')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')

// @route  GET api/category
// @desc   Get user's categories
// @access Private
router.get(
    '/',
    auth,
    getCategories
)

// @route  GET api/category
// @desc   Get user's categories
// @access Private
router.get(
    '/:id',
    auth,
    getCategoryByID
)

// @route  GET api/category/default
// @desc   Create default categories
// @access Private
router.get(
    '/default',
    auth,
    createDefaultCategories                
)

// @route  PUT api/category
// @desc   Add category
// @access Private
router.put(
    '/',
    [auth,[
        check('title', 'Title is required').not().isEmpty()
    ]], 
    addCategory
)

// @route  DELETE api/catrgory/:id
// @desc   Delete category
// @access Private

router.delete (
    '/:id',
    auth,
    deleteCategory
)

module.exports = router;
