import React, { useEffect, useState } from 'react';
import styles from './Reservation.module.css';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;
    const axios = require('axios').default;

    const [rooms, setRooms] = useState([]);

    useEffect (() => {

        getRoomTypes();
    }, []);

    const getRoomTypes = () => {
        axios.get('http://localhost:8080/room-types', {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            setRooms(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getRoomType = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                return r[i].name;
            }
        }
    }

    const getStayCost = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                let rate = r[i].rate;
                return  rate * numberOfNights;
            }
        }
    }

    return (
        <div className={styles.card}>
            <div>Guest: {guestEmail}</div>
            <div>Room type: {getRoomType(roomTypeId)}</div>
            <div>CheckIn date: {checkInDate}</div>
            <div>Number of nights: {numberOfNights}</div>
            <div>Stay Cost: {getStayCost(roomTypeId)}</div>
            <div><button>edit</button><button>delete</button></div>
        </div>
    );
}

export default Reservation;