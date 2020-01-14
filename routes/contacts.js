const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


const User = require('../models/User');
const Contact = require('../models/Contact');
// @route POST api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.id
        }).sort({ date: -1 }); // Gets the most recent contacts first

        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post('/', [
    auth,
    check('name', 'Name is required').not().isEmpty()
], () => {

});

// @route POST api/contacts/:id
// @desc Add new contact
// @access Private
router.put('/:id', () => {
    res.send('Update Contact');
});

// @route POST api/contacts/:id
// @desc Add new contact
// @access Private
router.delete('/:id', () => {
    res.send('Delete Contact');
});

module.exports = router;
