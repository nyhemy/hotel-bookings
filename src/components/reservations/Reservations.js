import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';
import Reservation from '../reservation/Reservation';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';

const Reservations = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        getReservations();
    }, []);

    // fetches reservations from API and sets them to reservations state
    const getReservations = () => {
        setError(false);
        setLoading(true);
        axios.get('http://localhost:8080/reservations', {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            setLoading(false);
            setReservations(response.data);
        })
        .catch(error => {
            setLoading(false);
            setError(true);
        });
    }

    const createReservation = () => {
        history.push("/reservations/create")
    }

    return (
        <div className={styles.center}>
            <h2>Reservations</h2>
            {error && <h3 className={styles.error}>Oops something went wrong</h3>}
            <div className={styles.row}>
                {loading ?
                    <img src={loadImg} alt="loading..." />
                :
                    !error && <>
                        <div><Button onClick={createReservation}>Create</Button></div>
                        {reservations.map((data, index) => <div className={styles.column} key={index}>
                            <Reservation
                                checkInDate={data.checkInDate}
                                guestEmail={data.guestEmail}
                                id={data.id}
                                numberOfNights={data.numberOfNights}
                                roomTypeId={data.roomTypeId}
                                user={data.user}
                            />
                        </div>)}
                    </>
                }
            </div>
        </div>
    );
}

export default Reservations;