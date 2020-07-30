const Deposit = require('../models/Deposit');
const {validationResult} = require('express-validator');

module.exports.createDeposit = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        amount,
        income,
        currency,
        icon,
        exchangeRate
    } = req.body;

    const newDeposit = {
        user: req.user.id,
        amount,
        icon,
        income,
        currency,
        exchangeRate
    };

    try {
        const deposit =  new Deposit(newDeposit);
        await deposit.save();
        res.json(deposit);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getIncomeDeposits = async (req,res) => {
    const userID = req.user.id
    const incomeID = req.params.id
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const deposits = await Deposit.find({$and: [{"user": userID}, {"income": incomeID}]}).skip(skip).limit(limit);
        res.json(deposits);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getDeposits = async (req,res) => {
    const userID = req.user.id
    let limit = req.query.limit ? parseInt(req.query.limit): 1000;
    let skip = req.query.skip ? parseInt(req.query.skip): 0;
    try {
        const deposits = await Deposit.find({user: userID}).skip(skip).limit(limit);
        res.json(deposits);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.deleteRelatedDeposits = async (req, res) => {
    const incomeID = req.params.id;
    const userID = req.user.id
    
    try {
        let deposits = await Deposit.deleteMany({$and: [{"user": userID}, {"income": incomeID}]})
        res.json(deposits)
    } catch (error) {
        res.status(400).json({error: err})
    }
}

module.exports.deleteSingleDeposit = async (req, res) => {
    const depositID = req.params.id;
    const userID = req.user.id
    
    try {
        let deposit = await Deposit.findOneAndDelete({$and: [{"user": userID}, {"_id": depositID}]})
        res.json(deposit)
    } catch (error) {
        res.status(400).json({error: err})
    }
}