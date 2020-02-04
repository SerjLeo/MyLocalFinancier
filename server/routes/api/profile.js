const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth')

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar'])
        if(!profile) {
            return res.status(400).json({msg: 'No profile for this user'})
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// @route  POST api/profile
// @desc   Create or update users profile
// @access Private

router.post('/', [auth,
    [
        check('name', 'name is required').not().isEmpty()
    ]
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        phone,
        name,
        location,
        options
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(phone) profileFields.phone = phone;
    if(name) profileFields.name = name;
    if(location) profileFields.location = location;
    if(options) profileFields.options = options;

    // if(bio) profileFields.bio = bio;
    // if(status) profileFields.status = status;
    // if(githubusername) profileFields.githubusername = githubusername;
    // if(skills) {
    //     profileFields.skills = skills.split(',').map(skill => skill.trim());
    // }
    // //Build social object
    // profileFields.social = {};
    // if(youtube) profileFields.social.youtube = youtube;
    // if(facebook) profileFields.social.facebook = facebook;
    // if(twitter) profileFields.social.twitter = twitter;
    // if(instagram) profileFields.social.instagram = instagram;
    // if(linkedin) profileFields.social.linkedin = linkedin;


    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set:profileFields},
                {new:true}
            );

            return res.json(profile);
        }

        //Create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

// @route  Get api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req,res)=> {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})

// @route  Get api/profile/user/:user_id
// @desc   Get someone's profile
// @access Public
router.get('/user/:user_id', async (req,res)=> {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: 'No profile for this user'})
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'No profile for this user'});
        }
        res.status(400).send("Server error");
    }
})

// @route  DELETE api/profile
// @desc   Delete profile, user and posts
// @access Private
router.delete   ('/', auth, async (req,res) => {
    try {
        // @todo - remove users & posts
        //remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg:'User removed'});
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})


// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put('/experience', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };
    try {
        const profile =  await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})
// @route  DELETE api/profile/experience/:experience_id
// @desc   Delete experience from profile
// @access Private
router.delete   ('/experience/:exp_id', auth, async (req,res) => {
    try {
        const profile =  await Profile.findOne({user:req.user.id});
        //get removed exp
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        console.log(removeIndex);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).send("Server error");
    }
})

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put('/education', [auth,[
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEd = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile =  await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEd);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})
// @route  DELETE api/profile/education/ed_id
// @desc   Delete education from profile
// @access Private
router.delete   ('/education/:ed_id', auth, async (req,res) => {
    try {
        const profile =  await Profile.findOne({user:req.user.id});
        //get removed exp
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.ed_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})

// @route  GET api/profile/github/:username
// @desc   Get user repos from github
// @access Public
router.get('/github/:username', async (req,res)=> {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        };
        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({msg: "no guthub profile found"});
            }
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).send("Server error");
    }
})
module.exports = router;