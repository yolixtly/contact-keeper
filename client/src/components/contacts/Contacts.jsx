import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);
    if (!contacts.length && !loading) {
        return (
            <Fragment>
                <h4>Please add a contact</h4>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {(contacts !== null) & !loading ? (
                    <TransitionGroup>
                        {filtered
                            ? filtered.map(contact => {
                                  return (
                                      <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                          <ContactItem contact={contact} />
                                      </CSSTransition>
                                  );
                              })
                            : contacts.map(contact => {
                                  return (
                                      <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                          <ContactItem contact={contact} />
                                      </CSSTransition>
                                  );
                              })}
                    </TransitionGroup>
                ) : (
                    <Spinner />
                )}
            </Fragment>
        );
    }
};

export default Contacts;
