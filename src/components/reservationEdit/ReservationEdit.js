import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get, getSimple } from '../Functions';
import loadImg from '../ajax-loader.gif';
import styles from './ReservationEdit.module.css';

/**
 * Component containing a form which handles the modification of existing Reservations
 */
const ReservationEdit = () => {

    // states used for general component functionality
    const axios = require('axios').default;
    const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    // id of Reservation pulled from URL
    let { id } = useParams();

    // Boolean representing if Reservation exists
    const [notFound, setNotFound] = useState(false);

    // states for form inputs
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [numNights, setNumNights] = useState(0);
    const [room, setRoom] = useState('');

    // states for error handling
    const [errorMsg, setErrorMsg] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [numNightError, setNumNightsError] = useState('');
    const [roomError, setRoomError] = useState('');
    
    /**
     * Redirects user to login in not logged in, otherwise makes a request to backend for Reservation with id provided
     * Also retrieves all rooms from API
     */
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        if (isNaN(Number(id))) {
            setNotFound(true);
        }

        getSimple('/reservations/' + id, setErrorMsg, setLoading)
        .then(response => {
            let res = response.data;
            setLoading(false);

            setEmail(res.guestEmail);
            setDate(res.checkInDate);
            setNumNights(res.numberOfNights);
            setRoom(res.roomTypeId);
        })
        .catch(error => {
            setLoading(false);

            if(error.response) {
                if (error.response.status === 404) {
                    setNotFound(true);
                    setErrorMsg('404 Not Found');
                } else {
                    isNaN(Number(id)) ? setErrorMsg('404 Not Found') : setErrorMsg("Oops something went wrong");
                }
            } else if (error.request) {
                setErrorMsg("Oops something went wrong");
            }
        });

        get('/room-types', setErrorMsg, setLoading, setRooms);
    }, [history, id]);

    /**
     * Handles changes to inputs
     * 
     * @param {event} event is when input changes its value
     */
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

    /**
     * Handles form submission event, including validation and API calls
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

        let loopId = null;

        for (let r of rooms) {
            if (r.id === Number(room)) {
                loopId = r.id;
            }
        }

        if (loopId === null) {
            setRoomError('Must select a room type');
            noValidate = true;
        }

        if (noValidate) {
            return;
        }

        setLoading(true);

        axios.put('http://localhost:8080/reservations/' + id,

            {
            id,
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
            {!notFound && <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                        {rooms.map((data, index) => {
                            if (data.active) {
                                 return <option value={data.id} key={index}>{data.name}</option>
                            } else {
                                return null;
                            }
                        })};
                    </select>
                    <button type='submit'>Update</button>
                </div>
                <div className={styles.inputError}>{roomError}</div>
            </form>}
        </div>
    );
}

export default ReservationEdit;