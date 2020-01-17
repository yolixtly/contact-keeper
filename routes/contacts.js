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
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, email, phone, type } = req.body;

    try {
        // Verify new Contact's email is unique among User's Contact
        const contact = await Contact.find({
            user: req.user.id,
            email: email
        });

        if (contact.length) {
            console.log('found Contact', contact)
            return res.status(503).json({ msg: 'Contact with email already exists' });
        }

        // Create new Contact
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        console.log('new Contact', newContact)
        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/contacts/:id
// @desc Add new contact
// @access Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build Contact Object
    const contactFields = {};
    if (name) {
        contactFields.name = name;
    }
    if (email) {
        contactFields.email = email;
    }
    if (phone) {
        contactFields.phone = phone;
    }
    if (type) {
        contactFields.type = type;
    }

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                msg: 'Contact not found'
            });
        }

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not Authorized"
            });
        }

        // UPDATE CONTACT
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true });

        res.json(contact);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/contacts/:id
// @desc Add new contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                msg: 'Contact not found'
            });
        }

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not Authorized"
            });
        }

        // DELETE CONTACT
        await Contact.findOneAndRemove(req.params.id);

        res.json({
            msg: 'Contact Removed'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
