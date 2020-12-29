import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomTypes.module.css';
import Room from '../room/Room';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';
import { get } from '../Functions';

/**
 * Component used to display all rooms from backend
 */
const RoomTypes = () => {

    // states used for general component functionality
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);

    // state used for error message
    const [errorMsg, setErrorMsg] = useState('');

    /**
     * redirects user to Reservations if not logged in and/or a manager, else retrieves all rooms from API
     */
    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/reservations");
        }

        get('/room-types', setErrorMsg, setLoading, setRooms)

    }, [history]);


    /**
     * Redirects to CreateRoom endpoint
     */
    const createRoom = () => {
        history.push('/room-types/create');
    }

    return (
        <div className={styles.center}>
            <h2>Rooms</h2>
            {errorMsg && <h3 className={styles.error}>{errorMsg}</h3>}
            <div className={styles.row}>{loading
                ?
                    <img src={loadImg} alt="loading..." />
                :
                    errorMsg === '' && <>
                        <div><Button onClick={createRoom}>Create</Button></div>
                        {rooms.map((data, index) => <div className={styles.column} key={index}>
                            <Room
                                id={data.id}
                                name={data.name}
                                description={data.description}
                                rate={data.rate}
                                isActive={data.active}
                            />
                        </div>)}
                    </>
            }</div>
        </div>
    );
}

export default RoomTypes;