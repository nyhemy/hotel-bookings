import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    const {logout} = props;
    sessionStorage.clear();
    useEffect(() => {
        logout(false);
    });
    return <Redirect to="/" />;
}

export default Logout;