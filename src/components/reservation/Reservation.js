import React, { useEffect, useState } from 'react';
import styles from './Reservation.module.css';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;
    const axios = require('axios').default;

    const [rooms, setRooms] = useState([]);
    const history = useHistory();

    useEffect (() => {

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

    const getRoomType = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                return r[i].name;
            }
        }
    }

    const getStayCost = (num) => {
        let r = rooms;
        for (let i = 0; i <= r.length-1; i++) {
            if (r[i].id === num) {
                let rate = r[i].rate;
                return  rate * numberOfNights;
            }
        }
    }

    const deleteReservation = () => {
        axios.delete('http://localhost:8080/reservations/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: {
                id: id
            }
        });
        window.location.reload();
    }

    const editReservation = () => {
        history.push('/reservations/edit/' + id)
    }

    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <div>Guest: {guestEmail}</div>
                <div>Room type: {getRoomType(roomTypeId)}</div>
                <div>CheckIn date: {checkInDate}</div>
                <div>Number of nights: {numberOfNights}</div>
                <div>Stay Cost: {getStayCost(roomTypeId)}</div>
            </div>
            <div><Button onClick={editReservation}>Edit</Button><Button onClick={deleteReservation}>Delete</Button></div>
        </div>
    );
}

export default Reservation;