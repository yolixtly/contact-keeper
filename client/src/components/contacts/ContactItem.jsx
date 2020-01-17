import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
    const { _id, name, email, phone, type } = contact;
    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent, clearFilter } = contactContext;
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
        clearFilter();
    };
    return (
        <div className='card bg-light'>
            <h2 className='text-primary text-left'>
                {name}
                <span
                    style={style}
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h2>
            <ul>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open' /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone' /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>
                    Edit
                </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

const style = {
    float: 'right'
};

export default ContactItem;
