const {validationResult} = require('express-validator')
const Profile = require('../models/Profile');
const User = require('../models/User');

module.exports.getProfile = async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar'])
        if(!profile) {
            return res.status(400).json({msg: 'No profile for this user'})
        }

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error')
    }
}

module.exports.updateProfile = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        phone,
        name,
        location,
        language,
        currencyPairs,
        mainCurrency
    } = req.body;

    //Build profile object
    const profileFields = {
        user: req.user.id,
        phone,
        name,
        location,
        language,
        currencyPairs,
        mainCurrency
    };

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile) {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set:profileFields},
                {new:true}
            );

            return res.json(profile);
        }

        profile = new Profile(profileFields);

        await profile.save();
        return res.json(profile);

    } catch(err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}

module.exports.deleteProfile = async (req,res) => {
    try {
        //remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        return res.json({msg:'User removed'});
    } catch (err) {
        console.error(err.message);
        return res.status(400).send("Server error");
    }
}
