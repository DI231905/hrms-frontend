import { errorHandler } from "helpers/apiErrorHandler";
import axiosApi from "../api";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from '../constants/ActionTypes';



export const adduser = (data, cb) => {
    axiosApi.defaults.headers.common['token'] = `${localStorage.getItem('token')}`;
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axiosApi.post('/user', data).then((res) => {
            if (res.data.status == 1) {
                dispatch({ type: FETCH_SUCCESS });
                dispatch({
                    type: SHOW_MESSAGE,
                    payload: res.data.message,
                });
            } else {
                dispatch({ type: FETCH_ERROR, payload: '' });
            }
            if (cb) cb(res.data)
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}

export const getUser = (cb) => {
    axiosApi.defaults.headers.common['token'] = `${localStorage.getItem('token')}`;
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axiosApi.get('/user/show').then((res) => {
            console.log(res,'res')
            if (res.status == 200) {
                if (cb) cb(res.data.user)

            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}

export const getUserById = (id,cb)=>{
    axiosApi.defaults.headers.common['token'] = `${localStorage.getItem('token')}`;
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axiosApi.get(`/user/${id}`).then((res) => {
            console.log(res,'res')
            if (res.status == 200) {
                if (cb) cb(res.data.user)

            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}


export const designationsList = (cb) =>{
    axiosApi.defaults.headers.common['token'] = `${localStorage.getItem('token')}`;
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axiosApi.get(`/user/designation`).then((res) => {
            console.log(res,'res')
            if (res.status == 200) {
                console.log(res,'res')
                if (cb) cb(res.data.response)

            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}