import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReservationCreate.module.css';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';

const ReservationCreate = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
        
        getRoomTypes();
    }, []);

    const getRoomTypes = () => {
        setError(false);
        setLoading(true);
        axios.get('http://localhost:8080/room-types', {
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


    const handleChange = (event) => {
        event.preventDefault();
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "date":
                setDate(event.target.value);
                break;
            case "numNights":
                setNumNights(event.target.value);
                break;
            case "room":
                setRoom(event.target.value);
                break;
            default:
                break;
        }      
    }

    const handleSubmit = () => {

    }

    return (
        <div className={styles.container}>
            {error && <h3 className={styles.error}>Oops something went wrong</h3>}
            {loading ?
                <img src={loadImg} alt="loading..." />
            :
                !error && <>
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.input}><input type='email' name='email' placeholder='email' onChange={handleChange} /></div> 
                        <div className={styles.input}><input type='text' name='date' placeholder='check-in date' onChange={handleChange} /></div>
                        <div className={styles.input}><input type='number' name='numNights' placeholder='number of nights' onChange={handleChange} /></div>
                        <div>
                            <select className={styles.select} name='room' onChange={handleChange}>
                                <option>--select room--</option>
                                <option value="test1">test1</option>
                                <option value="test2">test2</option>
                                <option value="test3">test3</option>
                                <option value="test4">test4</option>
                            </select>
                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}

export default ReservationCreate;