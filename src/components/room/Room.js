import React from 'react';
import styles from './Room.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

const Room = (props) => {
    const {id, name, description, rate, isActive} = props;
    const history = useHistory();

    const editRoom = () => {
        history.push('/room-types/edit/' + id)
    }

    return (
        <div className={styles.card}>
            <div>Room: {name}</div>
            <div className={styles.description} >Description: {description}</div>
            <div>Rate: {rate}</div>
            <div>{isActive ? "Active" : "Inactive"}</div>
            <div><Button onClick={editRoom}>Edit</Button></div>
        </div>
    );
}

export default Room;