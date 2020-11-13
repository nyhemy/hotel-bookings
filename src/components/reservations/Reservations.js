import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';

const Reservations = () => {

    const axios = require('axios').default;
    const history = useHistory();
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
    });

    const getReservations = () => {
        axios.get('http://localhost:8080/reservations', {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className={styles.center}>
            reservation_placeholder
            <button onClick={getReservations}>fetch_reservations</button>
        </div>
    );
}

export default Reservations;