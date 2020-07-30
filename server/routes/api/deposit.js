const express = require('express');
const router = express.Router();
const {
    createDeposit,
    getIncomeDeposits,
    getDeposits,
    deleteRelatedDeposits,
    deleteSingleDeposit
} = require('../../controllers/depositController')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')

// @route  PUT api/deposit/
// @desc   Add deposit
// @access Private
router.put(
    '/',
    [auth,[
        check('currency', 'Currency is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty().isFloat(),
        check('income', 'Income is required').not().isEmpty(),
        check('exchangeRate', 'Exchange rate is required').not().isEmpty()
    ]],
    createDeposit
)

// @route  GET api/deposit/
// @desc   Get user's deposits
// @access Private
router.get(
    '/',
    auth,
    getDeposits
)

// @route  GET api/deposit/:id
// @desc   Get deposits by income
// @access Private
router.get(
    '/:id',
    auth,
    getIncomeDeposits
)

// @route  DELETE api/deposit/:id
// @desc   Delete single deposit
// @access Private
router.delete(
    '/:id',
    auth,
    deleteSingleDeposit
)
// @route  DELETE api/deposit/related/:id
// @desc   Delete income's related deposits
// @access Private
router.delete(
    '/related/:id',
    auth,
    deleteRelatedDeposits
)

module.exports = router;