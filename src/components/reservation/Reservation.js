import React from 'react';
import styles from './Reservation.module.css';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;

    const roomType = (num) => {
        
    }

    return (
        <div className={styles.card}>
            <div>Guest: {guestEmail}</div>
            <div>Room type: {roomTypeId}</div>
            <div>CheckIn date: {checkInDate}</div>
            <div>Number of nights: {numberOfNights}</div>
        </div>
    );
}

export default Reservation;