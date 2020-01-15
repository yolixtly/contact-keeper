import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Jenny Watson',
                email: 'jenny@gmail.com',
                phone: '333-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Jon Watson',
                email: 'jon@gmail.com',
                phone: '313-222-2222',
                type: 'professional'
            }
        ]
    };

    // State allows to access the state
    // Dispatch allows us to dispatch objects to the Reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter


    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact: addContact
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
