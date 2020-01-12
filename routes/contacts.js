const express = require('express');
const router = express.Router();

// @route POST api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', () => {
    res.send('Get all Contacts');
});

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post('/', () => {
    res.send('Add a Contact');
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
