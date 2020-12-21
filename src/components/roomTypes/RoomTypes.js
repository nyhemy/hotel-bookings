import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomTypes.module.css';
import Room from '../room/Room';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';

const RoomTypes = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/");
        }

        const getRoomTypes = () => {
        setError(false);
        setLoading(true);
        axios.get('http://localhost:8080/room-types', 
        {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            setLoading(false);
            setRooms(response.data);
        })
        .catch(error => {
            setLoading(false);
            setError(true);
        });
    }

        getRoomTypes();
    }, [axios, history]);


    const createRoom = () => {
        history.push('/room-types/create');
    }

    return (
        <div className={styles.center}>
            <h2>Rooms</h2>
            {error && <h3 className={styles.error}>Oops something went wrong</h3>}
            <div className={styles.row}>
                {loading ?
                    <img src={loadImg} alt="loading..." />
                :
                    !error && <>
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
                }
            </div>
        </div>
    );
}

export default RoomTypes;