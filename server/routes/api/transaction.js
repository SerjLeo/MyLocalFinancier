const express = require('express');
const router = express.Router();
const {
    getTransactionsWithParams,
    createTransaction,
    getTransactionsByType,
    getTransactionsByIncome,
    getTransactionsByCategory,
    deleteRelatedTransactions,
    deleteSingleTransaction
} = require('../../controllers/transaction')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')

// @route  GET api/transaction?skip=''&limit=''
// @desc   Get transactions with params
// @access Private
router.get(
    '/',
    auth,
    getTransactionsWithParams
)

// @route  GET api/transaction/income/:incomeID?skip=''&limit=''
// @desc   Get transactions by income
// @access Private
router.get(
    '/income/:incomeID',
    auth,
    getTransactionsByIncome
)

// @route  GET api/transaction/byCategory/:categoryID?skip=''&limit=''
// @desc   Get transactions by category
// @access Private
router.get(
    '/category/:categoryID',
    auth,
    getTransactionsByCategory
)

// @route  GET api/transaction/type/:type?skip=''&limit=''
// @desc   Get transactions by type
// @access Private
router.get(
    '/type/:type',
    auth,
    getTransactionsByType
)

// @route  POST api/transaction
// @desc   Create new transaction
// @access Private
router.post(
    '/',
    auth,
    createTransaction
)

// @route  DELETE api/transaction/:transactionID
// @desc   Delete single transaction
// @access Private
router.delete(
    '/:transactionID',
    auth,
    deleteSingleTransaction
)

// @route  DELETE api/transaction/related/:incomeID
// @desc   Delete income's related transactions
// @access Private
router.delete(
    '/related/:incomeID',
    auth,
    deleteRelatedTransactions
)

module.exports = router;
