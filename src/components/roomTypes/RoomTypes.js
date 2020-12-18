import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomTypes.module.css';
import Room from '../room/Room';
import Button from '../button/Button';

const RoomTypes = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [rooms, setRooms] = useState([]);

    useEffect (() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

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

    const createRoom = () => {
        history.push('/room-types/create');
    }

    return (
        <div className={styles.center}>
            <h2>Rooms</h2>
            <Button onClick={createRoom}>Create</Button>
            <div className={styles.row}>
                {rooms ? rooms.map(
                    (data, index) => <div className={styles.column} key={index}><Room
                        id={data.id}
                        name={data.name}
                        description={data.description}
                        rate={data.rate}
                        isActive={data.active}
                    /></div>
                ) : "Oops something went wrong"}
            </div>
        </div>
    );
}

export default RoomTypes;