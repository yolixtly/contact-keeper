const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', () => {
    res.send('Registers a User');
});

module.exports = router;
