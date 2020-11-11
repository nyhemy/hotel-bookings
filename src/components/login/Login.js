import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = (props) => {
    const {login, loggedIn, isManager} = props;

    const [email, setEmail] = useState({
        value: "",
    });

    const [password, setPassword] = useState({
        value: "",
    });

    const [isError, setIsError] = useState(false);
    
    const handleChange = (event) => {
        event.preventDefault();
        switch (event.target.name) {
        case "email":
            setEmail({ ...email, value: event.target.value });
            break;
        case "password":
            setPassword({ ...password, value: event.target.value });
            break;
        default:
            break;
        }      
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const validEmailRegex = 
          RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

          if (!validEmailRegex.test(email.value)) {
            setIsError(true);
          }
    }

    return (
        <div>
            <h1>Login</h1>
            {loggedIn && <>
                <h1>You are already logged in</h1>
            </>}

            {!loggedIn && <>
                <h1>form_placeholder</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div>{isError && "Invalid email or password"}</div>
                    <div><input type="email" name="email" placeholder="email" onChange={handleChange} /></div>
                    <div><input type="text" name="password" placeholder="password" onChange={handleChange} /></div>
                    <button type="submit">Login</button>
                </form>
                <button className={styles.button} onClick={login}><Link to="/reservations" className={styles.buttonLink}>login_test</Link></button>
            </>}
        </div>

    );
}

export default Login;