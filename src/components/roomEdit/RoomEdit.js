import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getSimple } from '../Functions';
import styles from './RoomEdit.module.css';
import loadImg from '../ajax-loader.gif';

const RoomEdit = () => {

    const axios = require('axios').default;
    const history = useHistory();
    let { id } = useParams();

    const [errorMsg, setErrorMsg] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [active, setActive] = useState(false);

    const [nameError, setNameError] = useState('');
    const [rateError, setRateError] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem("role") !== "manager") {
            window.location.reload();
            history.push("/");
        }

        getSimple('/room-types/' + id, setErrorMsg, setLoading)
        .then(response => {
            let res = response.data;
            setLoading(false);

            setName(res.name);
            setDescription(res.description);
            setRate(res.rate);
            setActive(res.active);
        })
        .catch(error => {
            setLoading(false);
            setErrorMsg('Oops something went wrong');
        });

    }, [history, id])

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
        setRateError('');

        let noValidate = false;

        if (name.length < 3) {
            setNameError('Must be at least 3 characters');
            noValidate = true;
        }

        if (parseInt(rate) <= 0 || rate === '') {
            setRateError('Must be number greater than zero');
            noValidate = true;
        }

        if (noValidate) {
            return;
        }

        setLoading(true);

        axios.put('http://localhost:8080/room-types/' + id,

            {
            id,
            name,
            description,
            rate,
            active
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

    return(
        <div className={styles.container}>
            <h2>Edit Room</h2>
            <h3 className={styles.error}>{loading ?
                <img src={loadImg} alt="loading..." />
            :
                errorMsg}
            </h3>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div>Room Name</div>
                <div className={styles.input}><input value={name} name={'name'} type='text' onChange={handleChange}/></div>
                <div className={styles.inputError}>{nameError}</div>
                <div>Description</div>
                <div className={styles.input}><input value={description} name={'description'} type='textarea' onChange={handleChange}/></div>
                <div className={styles.inputError}></div>
                <div>Room Rate</div>
                <div className={styles.input}><input value={rate} name={'rate'} type='number' onChange={handleChange}/></div>
                <div className={styles.inputError}>{rateError}</div>
                <div className={styles.input}><input className={styles.checkbox} value={active} name={'active'} type='checkbox' checked={active} onChange={handleChange}/>
                    <label className={styles.checkboxLabel}>Active</label>
                    <button className={styles.button} type='submit'>Update</button>
                </div>
                <div className={styles.inputError}></div>
            </form>
        </div>
    )
}

export default RoomEdit;