import { LOGOUT_ACTION } from 'store/action/AuthActions';
import {
    FETCH_ERROR,
    SHOW_MESSAGE,
} from '../constants/ActionTypes';

export function errorHandler(error, dispatch) {
    dispatch({ type: FETCH_ERROR });
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem('userDetails');
            dispatch({ type: LOGOUT_ACTION });
            setTimeout(()=>{
                dispatch({ type: SHOW_MESSAGE, payload: error.response.data.message });
            },200) 
        } else if (error.response.data) {
            dispatch({ type: SHOW_MESSAGE, payload: error.response.data.message });
        }
        dispatch({ type: SHOW_MESSAGE, payload: '' });
        console.log('Error****:', error.response.data.message);
    } else {
        dispatch({ type: SHOW_MESSAGE, payload: error.message });
        dispatch({ type: SHOW_MESSAGE, payload: '' });
    }
};

