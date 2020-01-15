import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [current]);

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    };
    const onSubmit = e => {
        e.preventDefault();

        if (!current) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        // Clean ContactAPI State
        clearCurrent();
        // Clean Component State
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    };
    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Update Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type:</h5>
            <input
                type='radio'
                name='type'
                value='personal'
                id='personal'
                onChange={onChange}
                checked={type === 'personal'}
            />{' '}
            <label htmlFor='personal'>Personal {'  '}</label>
            <input
                type='radio'
                name='type'
                value='professional'
                id='professional'
                onChange={onChange}
                checked={type === 'professional'}
            />
            <label htmlFor='professional'> Professional</label>
            <input
                type='submit'
                value={current ? 'Update Contact' : 'Add Contact'}
                className='btn btn-primary btn-block'
            />
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
