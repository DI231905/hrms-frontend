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
        axiosApi.get('user/show').then((res) => {
            console.log(res,'res')
            if (res.status == 200) {
            //     let obj = {};
            //     res?.data?.data.map((item) => {
            //         obj[item.type] = item.value;
            //     })
            //     dispatch({ type: GET_LOCALIZATION_SETTINGS, payload: obj })
            //     localStorage.setItem('timeZone', obj.timezone ? obj.timezone : moment.tz.guess())
            //     localStorage.setItem('dateFormat', obj.dateFormat ? obj.dateFormat : "DD-MM-YYYY")
            //     localStorage.setItem('timeFormat', obj.timeFormat ? obj.timeFormat : "24 Hours")
            //     localStorage.setItem('firstDayOfWeek', obj.firstDayOfWeek ? obj.firstDayOfWeek : "Sunday")
            //     localStorage.setItem('currency', obj.currency ? obj.currency : "INR")
            //     localStorage.setItem('currencySymbol', obj.currencySymbol ? obj.currencySymbol : "₹")
            //     localStorage.setItem('currencyposition', obj.currencyposition ? obj.currencyposition : "Left")
            //     localStorage.setItem('decimalSeparator', obj.decimalSeparator ? obj.decimalSeparator : "Comma(,)")
            //     localStorage.setItem('decimalNumber', obj.noOfSeparator ? obj.noOfSeparator : "2")
            //     localStorage.setItem('language', obj.language ? obj.language : "EN")
            //     dispatch({ type: FETCH_SUCCESS });
                if (cb) cb(res.data.user)

            } else {
                dispatch({ type: FETCH_ERROR, payload: res.data.message });
            }
        }).catch((error) => {
            errorHandler(error, dispatch)
        })
    }
}