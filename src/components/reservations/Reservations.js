import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';
import Reservation from '../reservation/Reservation';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';
import { get } from '../Functions';

/**
 * Component which displays a series of Reservations, as well as providing links to edit and create new ones
 */
const Reservations = () => {

    // states used for general component functionality
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState('');

    // state which contains Reservations returned from API
    const [reservations, setReservations] = useState([]);
    
    /**
     * Redirects user to Login if not logged in, otherwise requests all reservations from API
     */
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        get('/reservations', setErrorMsg, setLoading, setReservations);
    }, [history]);

    /**
     * Redirects to CreateReservation endpoint
     */
    const createReservation = () => {
        history.push("/reservations/create")
    }

    return (
        <div className={styles.center}>
            <h2>Reservations</h2>
            {error && <h3 className={styles.error}>{error}</h3>}
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