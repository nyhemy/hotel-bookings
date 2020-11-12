import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    const {logout} = props;
    sessionStorage.clear();
    logout(false);
    return <Redirect to="/" />;
}

export default Logout;