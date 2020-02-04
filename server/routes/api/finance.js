const express = require('express');
const router = express.Router();
const {
    createExpense,
    deleteCategory,
    addCategory,
    createFinance,
    getIncomes,
    addIncome,
    getIncomeByID,
    updateIncome,
    deleteIncome,
    getCategories
} = require('../../controllers/finance.controller')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')


// @route  GET api/finance
// @desc   Create or get users finance
// @access Private

router.get(
    '/',
    auth,
    createFinance
)

// @route  GET api/finance/incomes
// @desc   Get finance incomes
// @access Private
router.get(
    '/incomes',
    auth,
    getIncomes
)

// @route  GET api/finance/incomes/:id
// @desc   Get finance incomes
// @access Private
router.get(
    '/incomes/:id',
    auth,
    getIncomeByID
)

// @route  PUT api/finance/incomes
// @desc   Add finance income
// @access Private

router.put(
    '/incomes', [auth,[
        check('title', 'Title is required').not().isEmpty()
    ]],
    addIncome
)

// @route  PUT api/finance/incomes/:id
// @desc   Update finance income
// @access Private

router.put(
    '/incomes/:id',
    [auth,[
        check('balance', 'Balance is required').not().isEmpty().isFloat()
    ]],
    updateIncome
)
// @route  DELETE api/finance/incomes/:income_id
// @desc   Delete finance income
// @access Private
router.delete (
    '/incomes/:id',
    auth,
    deleteIncome
)

// @route  GET api/finance/categories
// @desc   Get finance categories
// @access Private
router.get(
    '/categories',
    auth,
    getCategories
)


// @route  PUT api/finance/category
// @desc   Add finance category
// @access Private
router.put(
    '/category',
    [auth,[
        check('title', 'Title is required').not().isEmpty()
    ]], 
    addCategory
)

// @route  PUT api/finance/category/:cat_id
// @desc   Update finance category
// @access Private
// router.put('/category/:cat_id', [auth,[
//     check('transaction', 'Transaction ID is required').not().isEmpty()
// ]], async (req,res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }
//     const {transaction} = req.body;
//     try {
//         const finance =  await Finance.findOneAndUpdate(
//             {user:req.user.id, "categories.id":req.param.cat_id},
//             {$push: { "categories.$.transactions":  transaction} }
//             );
//         await finance.save();
//         res.json(finance);
//     }   catch (err) {
//         res.status(400).send("Server error");
//     }
// })

// @route  DELETE api/profile/catrgory/cat_id
// @desc   Delete category from finance
// @access Private

router.delete (
    '/catrgory/:cat_id',
    auth,
    deleteCategory
)

// @route  PUT api/finance/expenses
// @desc   Add finance transaction
// @access Private
router.put(
    '/expenses',
    [auth,[
        check('title', 'Title is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty().isFloat(),
        check('income', 'Income is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty()
    ]],
    createExpense
)

module.exports = router;