import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const RoomCreate = () => {
    
    const history = useHistory();

    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/");
        }

    }, []);

    return (
        <div>
            
        </div>
    );
}

export default RoomCreate;