import React, { useEffect, useState } from 'react';
import styles from './Reservation.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';
import { get } from '../Functions';

/**
 * Reservation card component, used in Reservations. Takes data pulled from API and displays it
 * 
 * @param {*} props are props passed when the component is called
 */
const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId} = props;
    
    const axios = require('axios').default;
    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState('test');
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);

    /**
     * Pulls all rooms from database a component mount
     */
    useEffect (() => {

        get('/room-types', setErrorMsg, setLoading, setRooms);
    }, []);


    /**
     * Takes in a room id and, if it exists, spits out its name
     * 
     * @param {number} num is the id of a room
     * @returns {string} the name of a room
     */
    const getRoomType = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                return r[i].name;
            }
        }
    }

    /**
     * Gets the cost of a stay depending on a room rate and numberOfNights state
     * 
     * @param {number} num is the id of a room
     * @returns {number} stay cost, aka product of numberOfNights state and rate of room with id of num
     */
    const getStayCost = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                let rate = r[i].rate;
                return  rate * numberOfNights;
            }
        }
    }

    const deleteReservation = () => {
        setLoading(true);
        axios.delete('http://localhost:8080/reservations/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: {
                id
            }
        })
        .then(response => {
            setLoading(false);
            window.location.reload();
        })
        .catch(error => {
            setLoading(false);
            setErrorMsg("Oops something went wrong");
        });
    }

    const editReservation = () => {
        history.push('/reservations/edit/' + id)
    }

    return (
        <div className={styles.card}>
        {errorMsg !== '' && <h2 className={styles.notification}>{errorMsg}</h2>}
        {loading ?
                <img src={loadImg} alt="loading..." />
        :
            errorMsg === '' && <div>
                <div className={styles.container}>
                    <div>Guest: {guestEmail}</div>
                    <div>Room type: {getRoomType(roomTypeId)}</div>
                    <div>CheckIn date: {checkInDate}</div>
                    <div>Number of nights: {numberOfNights}</div>
                    <div>Stay Cost: {getStayCost(roomTypeId)}</div>
                </div>
                <div><Button onClick={editReservation}>Edit</Button><Button onClick={deleteReservation}>Delete</Button></div>
            </div>
        }
        </div>
    );
}

export default Reservation;