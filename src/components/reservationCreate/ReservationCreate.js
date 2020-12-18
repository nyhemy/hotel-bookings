import React from 'react';
import styles from './ReservationCreate.module.css';
import Button from '../button/Button';

const ReservationCreate = () => {

    const axios = require('axios').default;


    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    const createReservation = () => {

    }

    return (
        <div className={styles.container}>
            <form className={styles.form} id='ReservationCreate' onSubmit={handleSubmit} noValidate>
                <div className={styles.input}><input type='email' name='email' placeholder='email' onChange={handleChange} /></div> 
                <div className={styles.input}><input type='text' name='check-in date' placeholder='check-in date' onChange={handleChange} /></div>
                <div className={styles.input}><input type='number' name='number of nights' placeholder='number of nights' onChange={handleChange} /></div>
                <div>
                    <select className={styles.select} name='room type' form='ReservationCreate'>
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