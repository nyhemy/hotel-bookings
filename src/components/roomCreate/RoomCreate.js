import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomCreate.module.css';

const RoomCreate = () => {
    
    const history = useHistory();

    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/");
        }

    }, []);

    const handleChange = () => {

    }
    
    const handleSubmit = () => {

    }

    return (
        <div className={styles.container}>
        <h2>Create Room</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div><input className={styles.input} type='text' name='name' placeholder='room name' onChange={handleChange}/></div>
                <div><input className={styles.input} type='textarea' name='description' placeholder='room description' onChange={handleChange}/></div>
                <div><input className={styles.input} type='number' name='rate' placeholder='room rate' onChange={handleChange}/></div>
                <div>
                <input className={styles.input} type='checkbox' name='active status' placeholder='active status' onChange={handleChange}/>
                <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}

export default RoomCreate;