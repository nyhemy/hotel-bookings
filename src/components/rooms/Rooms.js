import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Rooms.module.css';

const Rooms = () => {

    const history = useHistory();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push("/");
        }
    });

    return (
        <div className={styles.center}>
            rooms_placeholder
        </div>
    );
}

export default Rooms;