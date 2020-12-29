import React from 'react';
import styles from './Room.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

/**
 * Component which takes data from backend Room entity and displays it
 * 
 * @param {*} props are props passed to component when it is called
 */
const Room = (props) => {

    // All props are passed in from RoomTypes component mapping and correlate to an existing Room entity in the API
    const {id, name, description, rate, isActive} = props;
    const history = useHistory();

    /**
     * Redirects to RoomTypes edit
     */
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