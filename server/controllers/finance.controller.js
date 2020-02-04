const User = require('../models/User');
const Finance = require('../models/Finance');

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
        currency,
        exchangeRate
    } = req.body;

    const newExpense = {
        title,
        amount,
        category,
        income,
        currency,
        exchangeRate
    };

    try {
        const finance =  await Finance.findOne({user:req.user.id});
        finance.expenses.unshift(newExpense);
        await finance.save();
        res.json(finance.expenses[0]);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.getCategories = async (req,res) => {
    try {
        const finance = await Finance.findOne({user: req.user.id})
        if(!finance) {
            return res.status(400).json({message: 'No finance for this user'})
        }
        res.status(200).json(finance.categories);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.deleteCategory = async (req,res) => {
    try {
        const finance =  await Finance.findOne({user:req.user.id});
        //get removed exp
        const removeIndex = finance.incomes.map(item => item.id).indexOf(req.params.cat_id);
        finance.incomes.splice(removeIndex,1);
        await finance.save();
        res.json(finance);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.addCategory = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        title,
        icon,
        description,
        color
    } = req.body;

    const newCat = {
        title,
        icon,
        description,
        color
    };
    try {
        const finance =  await Finance.findOne({user:req.user.id});
        finance.categories.unshift(newCat);
        await finance.save();
        res.json(finance);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.createFinance = async (req,res) => {

    const financeFields = {};

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({message: 'User does not exist!'})
    }

    financeFields.user = user._id;

    financeFields.categories = [
        {
            title: 'Pharmacy',
            icon: 'fas fa-pills fa-lg',
            color: '#4393b5'
        },
        {
            title: 'Travel',
            icon: 'fas fa-map-marked-alt fa-lg',
            color: '#87b337'
        },
        {
            title: 'Goods',
            icon: 'fas fa-shopping-cart fa-lg',
            color: '#ad9e39'
        },
        {
            title: 'Payments & Taxes',
            icon: 'fas fa-file-invoice-dollar fa-lg',
            color: '#ab8752'
        },
        {
            title: 'Others',
            icon: 'fas fa-suitcase fa-lg',
            color: '#8c7066'
        }
    ]
    
    try {
        let finance = await Finance.findOne({user: user._id})
        
        if(finance) {
            return res.json(finance);
        }

        //Create 
        newFinance = new Finance(financeFields)

        await newFinance.save();
        res.status(201).json(newFinance);

    } catch(err) {
        res.status(500).send({error: err});
    }
}

module.exports.getIncomes = async (req,res) => {
    try {
        const finance = await Finance.findOne({user: req.user.id})
        if(!finance) {
            return res.status(400).json({message: 'No finance for this user'})
        }
        res.status(200).json(finance.incomes);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.getIncomeByID = async (req,res) => {
    try {
        const finance = await Finance.findOne({user: req.user.id})

        if(!finance) {
            return res.status(400).json({message: 'No finance for this user'})
        }
        const id = req.params.id;

        const income = finance.incomes.filter(income => income._id == id);

        if (!income) {
            return res.status(404).json({message: 'Income not found!'})
        }
        res.status(200).json(income);
    } catch (err) {
        res.status(500).send('Server error')
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
        title,
        icon,
        type,
        balance,
        color,
        currency
    };
    try {
        const finance =  await Finance.findOne({user:req.user.id});
        finance.incomes.unshift(newInc);
        await finance.save();
        res.json(finance);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.updateIncome = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {balance, deposit} = req.body;
    try {
        if (!deposit) {
            const finance =  await Finance.findOneAndUpdate(
                {user:req.user.id},
                {$set: { "incomes.$[elem].balance" : balance}},
                {
                    arrayFilters: [{ "elem._id": req.params.id}],
                    returnNewDocument: true
                }
            );
            await finance.save();
            res.status(202).json({incomes: finance.incomes});
        } else {
            const finance =  await Finance.findOneAndUpdate(
                {user:req.user.id},
                {$set: { "incomes.$[elem].balance" : balance}, $push: { "incomes.$[elem].deposits":  deposit} },
                {
                    arrayFilters: [{ "elem._id": req.params.id}],
                    new: true
                }
            );
            await finance.save();
            res.status(202).json({incomes: finance.incomes});
        }
    }   catch (err) {
        res.status(400).json({err});
    }
}

module.exports.deleteIncome = async (req,res) => {
    try {
        const finance =  await Finance.findOne({user:req.user.id});
        if(!finance) {
            return res.status(404).json({message: 'No finance for this user'})
        }
        //get removed exp
        const removeIndex = finance.incomes.map(item => item.id).indexOf(req.params.id);
        finance.incomes.splice(removeIndex,1);
        await finance.save();
        res.status(200).json(finance);
    } catch (err) {
        res.status(400).send("Server error");
    }
}