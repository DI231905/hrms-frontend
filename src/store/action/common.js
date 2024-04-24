import {
    FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE
} from '../../constants/ActionTypes';

export const fetchStart = () => ({
    type: FETCH_START,
});

export const fetchSuccess = () => ({
    type: FETCH_SUCCESS,
});

export const fetchError = error => ({
    type: FETCH_ERROR,
    payload: error,
});

export const showMessage = message => ({
    type: SHOW_MESSAGE,
    payload: message,
});
