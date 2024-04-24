import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, NO_DATA } from '../../constants/ActionTypes';

const INIT_STATE = {
    error: '',
    loading: false,
    message: '',
    isDisabled: false,
    noData: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case FETCH_START: {
        return {
            ...state,
            message: '',
            loading: true,
            isDisabled: true,
        };
    }
    case FETCH_SUCCESS: {
        return {
            ...state,
            error: false,
            message: '',
            loading: false,
            isDisabled: false,
        };
    }
    case SHOW_MESSAGE: {
        return { ...state, message: action.payload };
    }
    case NO_DATA: {
        return { ...state, noData: action.payload,loading: false, };
    }
    case FETCH_ERROR: {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload,
            isDisabled: false,
        };
    }
    
    default:
        return state;
    }
};
