const express = require('express');
const router = express.Router();
const {
    getIncomes,
    addIncome,
    getIncomeByID,
    updateIncome,
    deleteIncome
} = require('../../controllers/incomeController')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')


// @route  GET api/income
// @desc   Get user's incomes
// @access Private
router.get(
    '/',
    auth,
    getIncomes
)

// @route  GET api/income/:id
// @desc   Get single income by ID
// @access Private
router.get(
    '/:id',
    auth,
    getIncomeByID
)

// @route  PUT api/income
// @desc   Add new income
// @access Private
router.put(
    '/', [auth,[
        check('title', 'Title is required').not().isEmpty()
    ]],
    addIncome
)

// @route  PUT api/income/:id
// @desc   Update income
// @access Private
router.put(
    '/update/:id',
    [auth,[
        check('balance', 'Balance is required').not().isEmpty().isFloat()
    ]],
    updateIncome
)

// @route  DELETE api/finance/income/:id
// @desc   Delete income
// @access Private
router.delete (
    '/:id',
    auth,
    deleteIncome
)

module.exports = router;