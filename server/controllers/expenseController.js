const User = require('../models/User');
const Expense = require('../models/Expense');
const {validationResult} = require('express-validator');


module.exports.createExpense = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        title,
        amount,
        category,
        income,
        icon,
        currency,
        exchangeRate
    } = req.body;

    const newExpense = {
        user: req.user.id,
        title,
        amount,
        icon,
        category,
        income,
        currency,
        exchangeRate
    };

    try {
        const expense =  new Expense(newExpense);
        await expense.save();
        res.json(expense);
    } catch (err) {
        console.log(err)
        res.status(400).send("Server error");
    }
}

module.exports.getUsersExpenses = async (req, res) => {
    const userID = req.user.id
    
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    
    try {
        let expenses = await Expense.find({user: userID}).skip(skip).limit(limit)
        res.json(expenses)
    } catch (error) {
        res.status(400).json({error: err})
    }
}

module.exports.getExpensesByIncome = async (req, res) => {
    const incomeID = req.params.id;
    const userID = req.user.id
    
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    
    try {
        let expenses = await Expense.find({$and: [{"user": userID}, {"income._id": incomeID}]}).skip(skip).limit(limit)
        res.json(expenses)
    } catch (error) {
        res.status(400).json({error: err})
    }
}

module.exports.getExpensesByCategory = async (req, res) => {
    const categoryID = req.params.id;
    const userID = req.user.id
    
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    
    try {
        let expenses = await Expense.find({$and: [{"user": userID}, {"category._id": categoryID}]}).skip(skip).limit(limit)
        res.json(expenses)
    } catch (error) {
        res.status(400).json({error: err})
    }
}

module.exports.deleteRelatedExpenses = async (req, res) => {
    const incomeID = req.params.id;
    const userID = req.user.id
    
    try {
        let expenses = await Expense.deleteMany({$and: [{"user": userID}, {"income._id": incomeID}]})
        res.json(expenses)
    } catch (error) {
        res.status(400).json({error: err})
    }
}

module.exports.deleteSingleExpense = async (req, res) => {
    const expenseID = req.params.id;
    const userID = req.user.id
    
    try {
        let expense = await Expense.findOneAndDelete({$and: [{"user": userID}, {"_id": expenseID}]})
        res.json(expense)
    } catch (error) {
        res.status(400).json({error: err})
    }
}