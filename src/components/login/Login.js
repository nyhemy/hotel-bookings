import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

        const validEmailRegex = 
          RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

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
            sessionStorage.setItem("token", token);
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            let role = decodedToken.roles;

            if (role === "manager") {
                isManager(true);
                sessionStorage.setItem("role", role);
            }
            login(true);
            history.push("/reservations");
        })
        .catch(error => {
            formState = false;
            setErrorMsg("Invalid email or password");
        });
        
        setFormValid(formState);
    }


    return (
        <div className={styles.center}>
            {loggedIn && <>
                <h3>{"Welcome to Hotel Bookings " + JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).sub}</h3>
            </>}

            {!loggedIn && <>
                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.error}>{!formValid && errorMsg}</div>
                    <div><input type="email" name="email" placeholder="email" onChange={handleChange} /></div>
                    <div><input type="password" name="password" placeholder="password" onChange={handleChange} /></div>
                    <button className={styles.button} type="submit">login</button>
                </form>
            </>}
        </div>

    );
}

export default Login;