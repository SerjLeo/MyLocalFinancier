const User = require('../models/User');
const Income = require('../models/Income');
const {validationResult} = require('express-validator');

module.exports.getIncomes = async (req,res) => {
    try {
        const incomes = await Income.find({user: req.user.id}).populate('user','id')
        if(!incomes) {
            return res.status(400).json({message: 'No incomes for this user'})
        }
        res.status(200).json(incomes);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.getIncomeByID = async (req,res) => {
    try {
        const income = await Income.findById(req.params.id).populate('user','id')
        if(!income) {
            return res.status(404).json({message: 'Income not found!'})
        }

        if(String(income.user._id) !== req.user.id) {
            return res.status(403).json({message: 'Access denied'})
        }
        res.status(200).json(income);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.updateIncome = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {balance} = req.body;

    try {
        const income =  await Income.findOneAndUpdate(
            {$and: [{user:req.user.id},{_id: req.params.id}]},
            {$set: {balance : balance}},
            {new: true}
        );
        await income.save();
        res.status(202).json(income);
    }   catch (err) {
        res.status(400).json({err});
    }
}

module.exports.addIncome = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        title,
        icon,
        type,
        currency,
        color,
        balance
    } = req.body;

    const newInc = {
        user: req.user.id,
        title,
        icon,
        type,
        balance,
        color,
        currency
    };
    try {
        const income = new Income(newInc)
        await income.save()
        return res.status(201).json(income)
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.deleteIncome = async (req,res) => {
    try {
        const income =  await Income.findOneAndDelete({_id:req.params.id});
        if(!income) {
            return res.status(404).json({message: 'No income found'})
        }
        res.status(200).json(income);
    } catch (err) {
        res.status(400).send("Server error");
    }
}
