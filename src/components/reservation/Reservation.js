import React from 'react';
import styles from './Reservation.module.css';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;

    return (
        <div className={styles.card}>
            <div>CheckIn date: {checkInDate}</div>
            <div>Guest: {guestEmail}</div>
            <div>Number of nights: {numberOfNights}</div>
            <div>Room type: {roomTypeId}</div>
        </div>
    );
}

export default Reservation;