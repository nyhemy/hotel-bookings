import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Reservations = () => {

    const history = useHistory();
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
    });

    return (
        <div>
            reservation_placeholder
        </div>
    );
}

export default Reservations;