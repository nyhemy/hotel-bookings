import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RoomCreate.module.css';

const RoomCreate = () => {
    
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [active, setActive] = useState(false);

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [rateError, setRateError] = useState('');
    const [activeError, setActiveError] = useState('');

    useEffect (() => {
        if (!sessionStorage.getItem("token") || sessionStorage.getItem("role") !== "manager") {
            history.push("/");
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
        setNameError('');
        setDescriptionError('');
        setRateError('');
        setActiveError('');

        let noValidate = false;

        if (name.length < 3) {
            setNameError('Must be at least 3 characters');
            noValidate = true;
        }

        if (noValidate) {
            return;
        }

    }

    return (
        <div className={styles.container}>
        <h2>Create Room</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div><input className={styles.input} type='text' name='name' placeholder='room name' onChange={handleChange}/></div>
                <div className={styles.inputError}>{nameError}</div>
                <div><input className={styles.input} type='textarea' name='description' placeholder='room description' onChange={handleChange}/></div>
                <div className={styles.inputError}>{descriptionError}</div>
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