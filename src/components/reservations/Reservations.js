import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';
import Reservation from '../reservation/Reservation';

const Reservations = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        getReservations();
    }, []);

    // fetches reservations from API and sets them to reservations state
    const getReservations = () => {
        axios.get('http://localhost:8080/reservations', {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            const res = response.data;
            setReservations(res);
        })
        .catch(error => {
            console.log(error);
        });
    }

    // const DisplayReservations = () => {
    //     console.log("reservations:")
    //     for (let res of reservations) {
    //         console.log(res);
    //     }
    // }

    return (
        <div className={styles.center}>
            <h2>Reservations</h2>
            {/* <button onClick={DisplayReservations}>display_reservations_console</button> */}
            <div className={styles.row}>
                {reservations ? reservations.map(
                    (data, index) => <div className={styles.column} key={index}><Reservation
                        checkInDate={data.checkInDate}
                        guestEmail={data.guestEmail}
                        id={data.id}
                        numberOfNights={data.numberOfNights}
                        roomTypeId={data.roomTypeId}
                        user={data.user}
                    /></div>
                ) : "Oops something went wrong"}
            </div>
        </div>
    );
}

export default Reservations;