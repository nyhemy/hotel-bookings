import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Handles user logout, removing all key:values in sessionStorage and redirecting to login page
 * 
 * @param {*} props are the props passed into Logout whenver it is called
 */
const Logout = (props) => {

    // logout is a callback for a boolean
    const {logout} = props;
    
    sessionStorage.clear();
    useEffect(() => {
        logout(false);
    });
    return <Redirect to="/" />;
}

export default Logout;