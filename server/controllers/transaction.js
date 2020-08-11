const Transaction = require('../models/Transaction');
const {validationResult} = require('express-validator');

module.exports.createTransaction = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        title,
        type,
        amount,
        category,
        income
    } = req.body;

    const newTransaction = {
        user: req.user.id,
        title,
        type,
        amount,
        category,
        income
    };

    try {
        const transaction = new Transaction(newTransaction);
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getTransactionsByIncome = async (req,res) => {
    const userID = req.user.id
    const incomeID = req.params.incomeID
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const transactions = await Transaction.find({$and: [{"user": userID}, {"income": incomeID}]})
            .sort({$natural:-1})
            .skip(skip)
            .limit(limit)
            .populate('category')
        res.json(transactions);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getTransactionsByCategory = async (req,res) => {
    const userID = req.user.id
    const categoryID = req.params.categoryID
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const transactions = await Transaction.find({$and: [{"user": userID}, {"category": categoryID}]})
            .sort({$natural:-1})
            .skip(skip)
            .limit(limit)
            .populate('income')
        res.json(transactions);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getTransactionsWithParams = async (req, res) => {
    const userID = req.user.id
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const transactions = await Transaction.find({"user": userID})
            .sort({$natural:-1})
            .skip(skip)
            .limit(limit)
            .populate('category')
            .populate('income')
        res.json(transactions);
    } catch (err) {
        res.status(400).send("Server error");
    }
}


module.exports.getTransactionsByType = async (req,res) => {
    const userID = req.user.id
    const type = Boolean(Number(req.params.type))
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const transactions = await Transaction.find({$and: [{user: userID}, {type: type}]}).sort({$natural:-1}).skip(skip).limit(limit);
        res.json(transactions);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.deleteRelatedTransactions = async (req, res) => {
    const incomeID = req.params.incomeID;
    const userID = req.user.id

    try {
        let transactions = await Transaction.deleteMany({$and: [{"user": userID}, {"income": incomeID}]})
        res.json(transactions)
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports.deleteSingleTransaction = async (req, res) => {
    const transactionID = req.params.transactionID;
    const userID = req.user.id

    try {
        let transaction = await Transaction.findOneAndDelete({$and: [{"user": userID}, {"_id": transactionID}]})
        res.json(transaction)
    } catch (error) {
        res.status(400).json({error})
    }
}
