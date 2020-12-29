// Functions to be used accros app

const axios = require('axios').default;

/**
 * Performs a specific GET requeset to backend API
 * 
 * @param {string} endpoint the endpoint in the backend to which the call is being made
 * @param {callback} setErrorMsg the function used to set an error message in the component that calls the function
 * @param {callback} setLoading a function connected to a boolean, used to determine if the app is loading data from API
 * @param {callback} setDataState a function that sets the state in which the response from the API will be stored
 */
const get = (endpoint, setErrorMsg, setLoading, setDataState) => {

    setErrorMsg('');
    setLoading(true);
    axios.get('http://localhost:8080' + endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then(response => {
        setLoading(false);
        setDataState(response.data);
    })
    .catch(error => {
        setLoading(false);
        setErrorMsg('Oops something went wrong');
    });
}

/**
 * Performs a more simple GET request to the backend API, useful for setting more custom behavior after the request is made
 * 
 * @param {string} endpoint the endpoint in the backend to which the call is being made
 * @param {callback} setErrorMsg the function used to set an error message in the component that calls the function
 * @param {callback} setLoading a function connected to a boolean, used to determine if the app is loading data from API
 */
const getSimple = (endpoint, setErrorMsg, setLoading) => {
    setErrorMsg('');
    setLoading(true);
    return axios.get('http://localhost:8080' + endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

export { get, getSimple };