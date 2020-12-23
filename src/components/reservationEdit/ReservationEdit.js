import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { get, getSimple } from '../Functions';
import loadImg from '../ajax-loader.gif';
import styles from './ReservationEdit.module.css';

const ReservationEdit = () => {

    const axios = require('axios').default;
    const history = useHistory();
    let { id } = useParams();

    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState(0);
    const [room, setRoom] = useState('');

    const [errorMsg, setErrorMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState({});
    const [rooms, setRooms] = useState([]);

    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [numNightError, setNumNightsError] = useState('');
    const [roomError, setRoomError] = useState('');
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        getSimple('/reservations/' + id, setErrorMsg, setLoading)
        .then(response => {
            let res = response.data;
            setLoading(false);

            setReservation(res);
            setEmail(res.guestEmail);
            setDate(res.checkInDate);
            setNumNights(res.numberOfNights);
            setRoom(res.roomTypeId);
        })
        .catch(error => {
            setLoading(false);
            setErrorMsg('Oops something went wrong');
        });

        get('/room-types', setErrorMsg, setLoading, setRooms);
    }, []);

    // const getReservation = () => {
    //     setError(false);
    //     setLoading(true);
    //     axios.get('http://localhost:8080/reservations/' + id, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'mode': 'cors',
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     })
    //     .then(response => {
    //         setLoading(false);
    //         setReservation(response.data);
    //     })
    //     .catch(error => {
    //         setLoading(false);
    //         setError(true);
    //     });
    // }

    const handleChange = (event) => {
        event.preventDefault();
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'date':
                setDate(event.target.value);
                break;
            case 'numNights':
                setNumNights(event.target.value);
                break;
            case 'room':
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

        if (numNights === 0 || numNights === '0' || numNights === '') {
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

        axios.put('http://localhost:8080/reservations/' + id,

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
            <h2>Edit Reservation</h2>
            <h3 className={styles.error}>{loading ?
                <img src={loadImg} alt="loading..." />
            :
                errorMsg}
            </h3>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div>Email</div>
                <div className={styles.input}><input value={email} name={'email'} type='email' onChange={handleChange}/></div>
                <div className={styles.inputError}>{emailError}</div>
                <div>Check-In Date</div>
                <div className={styles.input}><input value={date} name={'date'} type='text' onChange={handleChange}/></div>
                <div className={styles.inputError}>{dateError}</div>
                <div>Nights</div>
                <div className={styles.input}><input value={numNights} name={'numNights'} type='number' onChange={handleChange}/></div>
                <div className={styles.inputError}>{numNightError}</div>
                <div>Room</div>
                <div>
                    <select className={styles.select} value={room} name={'room'} onChange={handleChange}>
                        {rooms.map((data, index) => <option value={data.id} key={index}>
                            {data.name}
                        </option>)}
                    </select>
                    <button type='submit'>Update</button>
                </div>
                <div className={styles.inputError}>{roomError}</div>
            </form>
        </div>
    );
}

export default ReservationEdit;