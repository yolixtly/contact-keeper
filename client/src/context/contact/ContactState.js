import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CONTACT_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        error: null,
        filtered: null
    };

    // State allows to access the state
    // Dispatch allows us to dispatch objects to the Reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR
            });
        }
    }
    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR
            });
        }
    }

    // Delete Contact
    const deleteContact = async (_id) => {
        try {
            await axios.delete(`/api/contacts/${_id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: _id
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR
            });
        }
    }

    // Clear Contacts
    const clearContacts = id => {
        dispatch({
            type: CLEAR_CONTACTS,
            payload: id
        })
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    // Clear Current Contact
    const clearCurrent = contact => {
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    // Update Contact
    const updateContact = async (contact) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR
            });
        }
    }
    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({
            type: FILTER_CONTACT,
            payload: text
        });
    }

    // Clear Filter
    const clearFilter = (text) => {
        dispatch({
            type: CLEAR_FILTER
        });
    }


    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
