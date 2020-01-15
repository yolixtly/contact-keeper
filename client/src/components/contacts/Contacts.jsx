import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (!contacts.length) {
        return <h4>Please add a contact</h4>;
    }
    return (
        <Fragment>
            {filtered
                ? filtered.map(contact => {
                    return <ContactItem contact={contact} key={contact.id} />;
                })
                : contacts.map(contact => {
                    return <ContactItem contact={contact} key={contact.id} />;
                })}
        </Fragment>
    );
};

export default Contacts;
