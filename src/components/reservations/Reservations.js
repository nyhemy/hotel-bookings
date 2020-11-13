import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';
import Reservation from '../reservation/Reservation';

const Reservations = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [responseData, setResponseData] = useState([]);
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        // GetReservations();
    });

    const GetReservations = () => {
        axios.get('http://localhost:8080/reservations', {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            // setReservations(response.data);
            const responseData = response.data;
            console.log(responseData);
            setResponseData(responseData);
        })
        .catch(error => {
            console.log(error);
        });
    }

    // set response.data into a state, then use that to build a series of Reservation component objects and put them into their own state array
    // then display said array
    const SetReservationsFromData = () => {
        setReservations([]);
        for (let data of responseData) {
            // use Reservation component to build Reservation objects
            let res = <Reservation checkInDate={data.checkInDate} guestEmail={data.guestEmail} id={data.id} numberOfNights={data.numberOfNights} roomTypeId={data.roomTypeId} user={data.user} />
            setReservations(prevRes => [...prevRes, res]);
        }
    }

    const DisplayReservations = () => {
        console.log("reservations:")
        for (let res of reservations) {
            console.log(res);
        }
    }

    return (
        <div className={styles.center}>
            <h2>Reservations</h2>
            <button onClick={GetReservations}>get_reservations</button>
            <button onClick={SetReservationsFromData}>set_res_from_data</button>
            <button onClick={DisplayReservations}>display_reservations</button>
            <div>{reservations}</div>
        </div>
    );
}

export default Reservations;