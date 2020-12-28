import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import loadImg from '../ajax-loader.gif';

const Login = (props) => {
    const {login, loggedIn, isManager} = props;

    const axios = require('axios').default;
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formValid, setFormValid] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    
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
        setErrorMsg('');

        const validEmailRegex = 
          RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

        if (!validEmailRegex.test(email)) {
            formState = false;
            setErrorMsg("Invalid email or password");
        }

        setLoading(true);

        axios.post('http://localhost:8080/login', {
            email : email,
            password: password
        })
        .then(response => {
            setLoading(false);

            let token = response.data.token;
            sessionStorage.setItem("token", token);
            let decodedToken = JSON.parse(atob(token.split('.')[1]));
            let role = decodedToken.roles;
            let userEmail = decodedToken.sub;

            if (role === "manager") {
                isManager(true);
                sessionStorage.setItem("role", role);
            }

            sessionStorage.setItem("email", userEmail);
            
            login(true);
            history.push("/reservations");
        })
        .catch(error => {
            setLoading(false);
            formState = false;
            if(error.response.status === 400) {
                setErrorMsg("Invalid email or password");
            } else if (error.request){
                setErrorMsg("Oops something went wrong");
            }
        });
        
        setFormValid(formState);
    }


    return (
        <div className={styles.container}>
            {loggedIn && <>
                <h3>{"Welcome to Hotel Bookings " + JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).sub}</h3>
            </>}

            {!loggedIn && <>
                <form onSubmit={handleSubmit} noValidate>
                    <div><input type="email" name="email" placeholder="email" onChange={handleChange} /></div>
                    <div><input type="password" name="password" placeholder="password" onChange={handleChange} /></div>
                    <div className={styles.notification}>{loading ? <img src={loadImg} alt="loading..." /> : errorMsg}</div>
                    <button className={styles.button} type="submit">login</button>
                </form>
            </>}
        </div>

    );
}

export default Login;