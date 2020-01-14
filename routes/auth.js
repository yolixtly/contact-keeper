const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth');


// @route GET api/auth
// @desc Auth user and get Token
// @access Public
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            // Did not find the user by email
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    msg: 'Invalid Credentials'
                })
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                // expriresIn: 3600 // Production
                expiresIn: 360000
            }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token })
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        // Get the user without the password
        let user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
