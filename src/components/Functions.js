const get = (endpoint, setErrorMsg, setLoading, setDataState) => {

    const axios = require('axios').default;

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

const post = (endpoint, body, header) => {

}

export { get, post };