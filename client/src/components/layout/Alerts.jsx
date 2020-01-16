import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/AlertContext';
const Alerts = props => {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => {
            return (
                <div key={alert.id} className={`alert-${alert.type}`}>
                    <i className='fas fa-info-circle' /> {alert.msg}
                </div>
            );
        })
    );
};

export default Alerts;
