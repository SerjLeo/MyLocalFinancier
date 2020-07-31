const User = require('../models/User');
const Category = require('../models/Category');
const {validationResult} = require('express-validator');

module.exports.getCategories = async (req,res) => {
    try {
        const categories = await Category.find({user: req.user.id})
        if(!categories) {
            return res.status(400).json({message: 'No categories found'})
        }
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.getCategoryByID = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category) {
            return res.status(404).json({message: 'Category not found!'})
        }
        if(category.user != req.user.id) {
            return res.status(403).json({message: 'Access denied'})
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).send('Server error')
    }
}

module.exports.deleteCategory = async (req,res) => {
    try {
        const category =  await Category.findOneAndDelete({_id:req.params.id});
        if(!category) {
            return res.status(404).json({message: 'No category found'})
        }
        res.json(category);
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

    const category = {
        user: req.user.id,
        title,
        icon,
        description,
        color
    };
    try {
        newCategory = new Category(category)
        newCategory.save()
        res.json(newCategory);
    } catch (err) {
        res.status(400).send("Server error");
    }
}

module.exports.createDefaultCategories = async (req,res) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({message: 'User does not exist!'})
    }

    const categories = [
        {
            user: user._id,
            title: 'Pharmacy',
            icon: 'pharmacy',
            color: '#4393b5'
        },
        {
            user: user._id,
            title: 'Travel',
            icon: 'travel',
            color: '#87b337'
        },
        {
            user: user._id,
            title: 'Goods',
            icon: 'shopping-cart',
            color: '#ad9e39'
        },
        {
            user: user._id,
            title: 'Payments & Taxes',
            icon: 'bill',
            color: '#ab8752'
        },
        {
            user: user._id,
            title: 'Others',
            icon: 'suitcase',
            color: '#8c7066'
        }
    ]
    
    const existedCategories = await Category.find({user: req.user.id})

    if(existedCategories.length !== 0) {
        return res.status(403).json('Default categories already has been created')
    }

    try {
        categories.map(category => {
            newCategory = new Category(category)
            newCategory.save()
        })
        
        res.status(201).json('Default categories created');

    } catch(err) {
        res.status(500).send({error: err});
    }
}