import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ReservationCreate.module.css';
import Button from '../button/Button';
import loadImg from '../ajax-loader.gif';

const ReservationCreate = () => {

    const axios = require('axios').default;
    const history = useHistory();

    // states used for component functionality
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // states for form input
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState(0);
    const [room, setRoom] = useState('');

    // states for error messages
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [numNightError, setNumNightsError] = useState('');
    const [roomError, setRoomError] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
        
        getRoomTypes();
    }, []);

    const getRoomTypes = () => {
        setErrorMsg('');
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
            setErrorMsg('Oops something went wrong');
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

        if (numNights === 0) {
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
                    <div className={styles.inputError}>{emailError}</div>
                    <div className={styles.input}><input type='email' name='email' placeholder='email' onChange={handleChange} /></div> 
                    <div className={styles.inputError}>{dateError}</div>
                    <div className={styles.input}><input type='text' name='date' placeholder='check-in date' onChange={handleChange} /></div>
                    <div className={styles.inputError}>{numNightError}</div>
                    <div className={styles.input}><input type='number' name='numNights' placeholder='number of nights' onChange={handleChange} /></div>
                    <div className={styles.divider}>
                    <div className={styles.inputError}>{roomError}</div>
                    <select defaultValue={'DEFAULT'} className={styles.select} name='room' onChange={handleChange}>
                    <option value='DEFAULT' disabled>--select room--</option>
                        {rooms.map((data, index) => <option value={data.id} key={index}>
                            {data.name}
                        </option>)}
                    </select>
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </>
        </div>
    );
}

export default ReservationCreate;