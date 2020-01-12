const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', () => {
    res.send('Get logged in User');
});

// @route GET api/auth
// @desc Auth user and get Token
// @access Public
router.post('/', () => {
    res.send('Log in User');
});

module.exports = router;
