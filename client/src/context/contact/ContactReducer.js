import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS,
    GET_CONTACTS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS: {
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        }
        case ADD_CONTACT: {
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        }
        case UPDATE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact._id === action.payload._id) {
                        // Set the updated contact
                        return action.payload
                    } else {
                        return contact;
                    }
                }),
                loading: false
            }
        }
        case CLEAR_CONTACTS: {
            return {
                ...state,
                contacts: [],
                filtered: null,
                current: null,
                loading: false,
                error: null
            }
        }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => {
                    return contact._id !== action.payload
                }),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT: {
            return {
                ...state,
                current: null
            }
        }
        case FILTER_CONTACT: {
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        }
        case CLEAR_FILTER: {
            return {
                ...state,
                filtered: null
            }
        }

        case CONTACT_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state;
    }
}
