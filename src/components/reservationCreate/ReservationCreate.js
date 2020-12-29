import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReservationCreate.module.css';
import loadImg from '../ajax-loader.gif';
import { get } from '../Functions';

/**
 * Component containing form for curation of new Reservation
 */
const ReservationCreate = () => {

    // states used for general component functionality
    const axios = require('axios').default;
    const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    // states for form input
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState(0);
    const [room, setRoom] = useState('');

    // states for error messages
    const [errorMsg, setErrorMsg] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [numNightError, setNumNightsError] = useState('');
    const [roomError, setRoomError] = useState('');

    /**
     * Checks if user is logged in, else redirect to login, and makes call to API to get all rooms
     */
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
        
        get('/room-types', setErrorMsg, setLoading, setRooms);
    }, [history]);

    /**
     * Handles changes to input
     * 
     * @param {event} event is when the value of an input is changed
     */
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

    /**
     * Handles form submission, including validation and API calls
     * 
     * @param {event} event is the form submission event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError('');
        setDateError('');
        setNumNightsError('');
        setRoomError('');

        let noValidate = (false);

        const validEmailRegex = 
          RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
        
        const validDateRegex = RegExp(/(0[1-9]|1[012])[- -.](0[1-9]|[12][0-9]|3[01])[- -.](20)\d\d/i);

        if (!validEmailRegex.test(email)) {
            setEmailError('Must be a valid email');
            noValidate = true;
        }

        if (!validDateRegex.test(date)) {
            setDateError('Date must be mm-dd-yyyy');
            noValidate = true;
        }

        let num = Number(numNights);

        if (num <= 0 || numNights === '' || !Number.isInteger(num) ) {
            setNumNightsError('Must be number greater than zero');
            noValidate = true;
        }

        if (room === '') {
            setRoomError('Must select a room type');
            noValidate = true;
        }

        if (noValidate) {
            return;
        }

        setLoading(true);

        axios.post('http://localhost:8080/reservations',
            {
            user: sessionStorage.getItem('email'),
            guestEmail : email,
            roomTypeId: room,
            checkInDate: date,
            numberOfNights: numNights
            },
            {headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }}
        )
        .then(response => {
            setLoading(false);
            history.push('/reservations');
        })
        .catch(error => {
            setLoading(false);
            setErrorMsg('Oops something went wrong');
        })
    }

    return (
        <div className={styles.container}>
            <h2>Create Reservation</h2>
            <h3 className={styles.error}>{loading ?
                <img src={loadImg} alt="loading..." />
            :
                errorMsg}
            </h3>
            <>
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.input}><input type='email' name='email' placeholder='guest email' onChange={handleChange} /></div>
                    <div className={styles.inputError}>{emailError}</div>
                    <div className={styles.input}><input type='text' name='date' placeholder='check-in date' onChange={handleChange} /></div>
                    <div className={styles.inputError}>{dateError}</div>
                    <div className={styles.input}><input type='number' name='numNights' placeholder='number of nights' onChange={handleChange} /></div>
                    <div className={styles.inputError}>{numNightError}</div>
                    <div className={styles.divider}>
                        <select defaultValue={'DEFAULT'} className={styles.select} name='room' onChange={handleChange}>
                            <option value='DEFAULT' disabled>--select room--</option>
                            {rooms.map((data, index) => {
                                if (data.active) {
                                    return <option value={data.id} key={index}>{data.name}</option>
                                } else {
                                    return null;
                                }
                            })};
                        </select>
                        <button type='submit'>Create</button>
                    </div>
                    <div className={styles.inputError}>{roomError}</div>
                </form>
            </>
        </div>
    );
}

export default ReservationCreate;