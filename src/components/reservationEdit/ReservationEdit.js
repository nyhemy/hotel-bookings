import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { get } from '../Functions';

const ReservationEdit = () => {

    const axios = require('axios').default;
    const history = useHistory();
    let { id } = useParams();


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState();
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        get('/reservations/' + id, setError, setLoading, setReservation);
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

    return (
        <div>
            <form>
                <input type='email' />
                <input type='text'/>
                <input type='number'/>
                <select>
                    <option value='DEFAULT' disabled>--select room--</option>
                </select>
            </form>
        </div>
    );
}

export default ReservationEdit;