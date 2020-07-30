const express = require('express');
const router = express.Router();
const {
    createExpense,
    getExpensesByIncome,
    getExpensesByCategory,
    getUsersExpenses,
    deleteRelatedExpenses,
    deleteSingleExpense
} = require('../../controllers/expenseController')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')

// @route  PUT api/finance/expenses
// @desc   Add finance expense
// @access Private
router.put(
    '/',
    [auth,[
        check('title', 'Title is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty().isFloat(),
        check('income', 'Income is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty()
    ]],
    createExpense
)

// @route  GET api/expense?limit=6&skip=0
// @desc  Get user's expenses
// @access Private
router.get(
    '/',
    auth,
    getUsersExpenses
)

// @route  GET api/expense/byincome/:id?limit=6&skip=0
// @desc  Get expenses for income
// @access Private
router.get(
    '/byincome/:id',
    auth,
    getExpensesByIncome
)

// @route  GET api/expense/bycategory/:id?limit=6&skip=0
// @desc  Get expenses for income
// @access Private
router.get(
    '/bycategory/:id',
    auth,
    getExpensesByCategory
)

// @route  DELETE api/expense/related/:id
// @desc  Delete expenses related to income
// @access Private
router.delete(
    '/related/:id',
    auth,
    deleteRelatedExpenses
)

// @route  DELETE api/expense/:id
// @desc  Delete expense by ID
// @access Private
router.delete(
    '/:id',
    auth,
    deleteSingleExpense
)

module.exports = router;