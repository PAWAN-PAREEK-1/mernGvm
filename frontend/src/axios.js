import axios from 'axios';

const axiosInstanse = axios.create({

    baseURL: 'http://localhost:5000/api'
})

const token = window.localStorage.getItem('token');

axiosInstanse.defaults.headers = token


export default axiosInstanse