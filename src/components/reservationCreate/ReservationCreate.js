import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReservationCreate.module.css';
import Button from '../button/Button';

const ReservationCreate = () => {

    const axios = require('axios').default;
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
        //check API for roomtypes to be used in select dropdown in form
    }, []);


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

    const createReservation = () => {

    }

    return (
        <div className={styles.container}>
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
                    <Button onClick={createReservation}>Create</Button>
                </div>
            </form>
        </div>
    );
}

export default ReservationCreate;