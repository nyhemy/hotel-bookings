import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { get } from '../Functions';
import styles from './ReservationEdit.module.css';

const ReservationEdit = () => {

    const axios = require('axios').default;
    const history = useHistory();
    let { id } = useParams();


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState({});
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        get('/reservations/' + id, setError, setLoading, setReservation);
        get('/room-types', setError, setLoading, setRooms);
    }, []);

    // const getReservation = () => {
    //     setError(false);
    //     setLoading(true);
    //     axios.get('http://localhost:8080/reservations/' + id, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'mode': 'cors',
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     })
    //     .then(response => {
    //         setLoading(false);
    //         setReservation(response.data);
    //     })
    //     .catch(error => {
    //         setLoading(false);
    //         setError(true);
    //     });
    // }

    return (
        <div>
            <form className={styles.center}>
                <div>Email</div>
                <div><input value={reservation.guestEmail} type='email' /></div>
                <div>Check-In Date</div>
                <div><input value={reservation.checkInDate} type='text'/></div>
                <div>Nights</div>
                <div><input value={reservation.numberOfNights} type='number'/></div>
                <div>Room</div>
                <div>
                    <select>
                    <option value='DEFAULT' disabled>--select room--</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default ReservationEdit;