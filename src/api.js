import axios from "axios";
import { APIURL } from "./constants/constants";

const axiosApi = axios.create({
    baseURL: APIURL,
    headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
    },
})

axiosApi.interceptors.request.use(
    function (config) {
        config.headers = {
            ...config.headers
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
);

axiosApi.interceptors.response.use(
    function (response) {
        if (response?.status === 401) {
            localStorage.removeItem('token')
            window.location.replace("/")
        }
        return Promise.resolve(response)
    },
    async function (err) {
        const originalRequest = err.config;
        console.log('originalrequest', err?.response?.status, err?.response.data);
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            return Promise.reject(err?.response?.data)
        }
        else if (err?.response?.status == 401) {
            localStorage.removeItem('token')
            console.log('response in interceptor line number 53');
        } else {
            console.log('response in interceptor line number 82');
            return err;
        }
    }
);

export default axiosApi;