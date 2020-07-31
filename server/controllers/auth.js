const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');
const sendEmail = require('../helpers/email.send')
const messages = require('../helpers/email.messages')
const templates = require('../helpers/email.template')

module.exports.userAuth = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user =  await User.findOne({email});

        if (!user) {
            return res.status(400).json({errors: [{message: "Invalid email or password"}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!user.isConfirmed) {
            sendEmail(user.email, templates.confirm(user._id))
            return res.status(401).json({message: messages.resend(user.email)})
        }

        if(!isMatch) {
            return res.status(400).json({errors: [{message: "Invalid email or password"}]})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
        });
    } catch (error) {
        res.status(500).json('Server error');
    }    
}

module.exports.userRegister = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        let user =  await User.findOne({email});

        if (user) {
            if(!user.isConfirmed) {
                sendEmail(user.email, templates.confirm(user._id))
                return res.status(401).json({message: messages.resend(user.email)})
            } else {
                return res.status(400).json({errors: [{message: 'User already exists'}]})
            }
        }

        user = new User({
            name,
            email,
            password
        });
        
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        
        const newUser = await user.save(); 
        
        sendEmail(email, templates.confirm(newUser._id))
            .then(() => res.status(200).json({message: messages.confirm(newUser.email)}))
            .catch(error => res.json({error}))
    } catch (error) {
        res.status(500).json('Server error');
    }    
}

module.exports.userFind = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json('Server error');
    }
}

module.exports.userConfirm = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
      
        if (!user) {
            res.status(404).json({ message: messages.couldNotFind()})
        }
        
        else if (user && !user.isConfirmed) {
            User.findByIdAndUpdate(id, { isConfirmed: true })
            .then(() => {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    {expiresIn: 36000},
                    (err, token) => {
                        if (err) throw err;
                        res.status(202).json({token});
                })
            })
            .catch(error => console.log(error))
            }
        else  {
            res.status(208).json({ message: messages.alreadyConfirmed() })
            }
    } catch (err) {
        console.log(error)
    }
}