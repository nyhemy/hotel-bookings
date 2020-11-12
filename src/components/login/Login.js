import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styles from './Login.module.css';

const Login = (props) => {
    const {login, loggedIn, isManager} = props;

    const axios = require('axios').default;
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formValid, setFormValid] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    
    const handleChange = (event) => {
        event.preventDefault();
        switch (event.target.name) {
        case "email":
            setEmail(event.target.value);
            break;
        case "password":
            setPassword(event.target.value);
            break;
        default:
            break;
        }      
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let formState = true;
        setErrorMsg("");

        const validEmailRegex = 
          RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        if (!validEmailRegex.test(email)) {
            formState = false;
            setErrorMsg("Invalid email or password");
        }

        axios.post('http://localhost:8080/login', {
            email : email,
            password: password
        })
        .then(response => {
            let token = response.data.token;
            console.log(response.data);
            sessionStorage.setItem("token", token);
            let storedToken = sessionStorage.getItem("token");
            console.log("sessionStorage: " + storedToken);
            let atobTest = JSON.parse(atob(token.split('.')[1]));
            console.log(atobTest);
            login(true);
            history.push("/reservations");
        })
        .catch(error => {
            formState = false;
            setErrorMsg("Invalid email or password");
        })
        
        setFormValid(formState);
    }


    return (
        <div>
            <h1>Login</h1>
            {loggedIn && <>
                <h1>You are already logged in</h1>
            </>}

            {!loggedIn && <>
                <form onSubmit={handleSubmit} noValidate>
                    <div>{!formValid && errorMsg}</div>
                    <div><input type="email" name="email" placeholder="email" onChange={handleChange} /></div>
                    <div><input type="text" name="password" placeholder="password" onChange={handleChange} /></div>
                    <button className={styles.button} type="submit">login</button>
                </form>
                {/* <button className={styles.button} onClick={login}><Link to="/reservations" className={styles.buttonLink}>login_test</Link></button> */}
                {/* <div><button className={styles.button} onClick={postRequest}>post_test</button></div> */}
            </>}
        </div>

    );
}

export default Login;