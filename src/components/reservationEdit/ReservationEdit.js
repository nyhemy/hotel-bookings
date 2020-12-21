import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ReservationEdit = () => {

    const axios = require('axios').default;
    const history = useHistory();
    let { id } = useParams();

    const [ids, setIds] = useState([]);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }

        getReservation();
    }, []);

    const getReservation = () => {
        
    }

    return (
        <div>
            
        </div>
    );
}

export default ReservationEdit;