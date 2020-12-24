import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomCreate.module.css';

const RoomCreate = () => {
    
    const axios = require('axios').default;
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [active, setActive] = useState(false);

    const [nameError, setNameError] = useState('');
    // const [descriptionError, setDescriptionError] = useState('');
    const [rateError, setRateError] = useState('');
    // const [activeError, setActiveError] = useState('');

    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/");
            window.location.reload();
        }

    }, [history]);

    const handleChange = (event) => {
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "description":
                setDescription(event.target.value);
                break;
            case "rate":
                setRate(event.target.value);
                break;
            case "active":
                setActive(event.target.checked);
                break;
            default:
                break;
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (sessionStorage.getItem("role") !== "manager") {
            window.location.reload();
            history.push("/");
        }

        setNameError('');
        // setDescriptionError('');
        setRateError('');
        // setActiveError('');

        let noValidate = false;

        if (name.length < 3) {
            setNameError('Must be at least 3 characters');
            noValidate = true;
        }

        if (parseInt(rate) <= 0 || rate === '') {
            setRateError('Must be number greater than zero');
        }

        if (noValidate) {
            return;
        }

        setLoading(true);

        axios.post('http://localhost:8080/room-types',
            {
            name : name,
            description: description,
            rate: rate,
            active: active
            },
            {headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }}
        )
        .then(response => {
            setLoading(false);
            history.push('/room-types');
        })
        .catch(error => {
            setLoading(false);
            setErrorMsg('Oops something went wrong');
        })

    }

    return (
        <div className={styles.container}>
        <h2>Create Room</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div><input className={styles.input} type='text' name='name' placeholder='room name' onChange={handleChange}/></div>
                <div className={styles.inputError}>{nameError}</div>
                <div><input className={styles.input} type='textarea' name='description' placeholder='room description' onChange={handleChange}/></div>
                <div className={styles.inputError} />
                <div><input className={styles.input} type='number' name='rate' placeholder='room rate' onChange={handleChange}/></div>
                <div className={styles.inputError}>{rateError}</div>
                <div className={styles.divider}><input className={styles.checkbox} type='checkbox' name='active' checked={active} onChange={handleChange}/>
                    <label className={styles.checkboxLabel} for='checkbox'>Active</label>
                    <button className={styles.button} type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}

export default RoomCreate;