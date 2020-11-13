import React from 'react';
import styles from './Reservation.module.css';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;

    return (
        <div className={styles.card}>
            <div>{checkInDate}</div>
            <div>{guestEmail}</div>
            <div>{numberOfNights}</div>
            <div>{roomTypeId}</div>
            <div>{user}</div>
        </div>
    );
}

export default Reservation;