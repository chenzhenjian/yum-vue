import axios from 'axios';
import * as util from '../assets/util.js';

const root = process.env.API_ROOT;

const instance = axios.create({
    baseURL: root,
    timeout: 1000000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance.interceptors.response.use(function (response) {
    return response;
}, util.catchError);

export default instance;
