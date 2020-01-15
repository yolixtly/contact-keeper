import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    // use for simple forms to access the component State
    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        // Update the filter input based on the state from ContactContext API
        if (filtered === null) {
            text.current.value = '';
        }
    }, [filtered]);
    const onChange = e => {
        if (text.current.value) {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input type='text' ref={text} placeholder='Filter Contacts...' onChange={onChange} />
        </form>
    );
};

export default ContactFilter;
