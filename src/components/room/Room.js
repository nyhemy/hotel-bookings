import React from 'react';
import styles from './Room.module.css';

const Room = (props) => {
    const {id, name, description, rate, isActive} = props;

    return (
        <div className={styles.card}>
            <div>Room type: {name}</div>
            <div>Description: {description}</div>
            <div>Rate: {rate}</div>
            <div>{isActive ? "Active" : "Inactive"}</div>
            <div><button>edit</button></div>
        </div>
    );
}

export default Room;