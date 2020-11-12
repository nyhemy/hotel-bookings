import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Rooms = () => {

    const history = useHistory();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
    });

    return (
        <div>
            rooms_placeholder
        </div>
    );
}

export default Rooms;