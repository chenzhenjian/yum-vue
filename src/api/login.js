import axios from 'axios';

const root = process.env.API_ROOT;

const loginInstance = axios.create({
    baseURL: root,
    timeout: 1000
});

export default loginInstance;
