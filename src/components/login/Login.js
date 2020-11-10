import React from 'react';

const Login = (props) => {
    const {loggedIn, isManager} = props;

    return (
        <div>
            <h1>Login</h1>
            {loggedIn && <>
                <h1>You are already logged in</h1>
            </>}

            {!loggedIn && <>
                <h1>form_placeholder</h1>
            </>}
        </div>

    );
}

export default Login;