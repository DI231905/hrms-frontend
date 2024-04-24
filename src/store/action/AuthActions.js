
import { useNavigate } from 'react-router-dom';
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from '../../constants/ActionTypes';
import {
    formatError,
    login,
    // runLogoutTimer,
    saveTokenInLocalStorage,
    // signUp,
} from '../../services/AuthService';
// import { getLocalizationsettingsApi, getThemesettingsApi } from '../../services/CommonServices';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';



// export function signupAction(email, password, navigate) {

//     return (dispatch) => {
//         signUp(email, password)
//             .then((response) => {
//                 saveTokenInLocalStorage(response.data);
//                 runLogoutTimer(
//                     dispatch,
//                     response.data.expiresIn * 1000,
//                     //history,
//                 );
//                 dispatch(confirmedSignupAction(response.data));
//                 navigate('/dashboard');
//                 //history.push('/dashboard');
//             })
//             .catch((error) => {
//                 const errorMessage = formatError(error.response.data);
//                 dispatch(signupFailedAction(errorMessage));
//             });
//     };
// }

// export function Logout(navigate) {
//     localStorage.removeItem('userDetails');
//     localStorage.removeItem('token');
//     localStorage.removeItem('activeSubMenu');
//     localStorage.removeItem('activeMenu');
//     // navigate('/login');
//     navigate({
//         pathname: '/login',
//         // search: `${window.location.href}`,
//     });

//     return {
//         type: LOGOUT_ACTION,
//     };
// }
// export function LogoutUser(navigate) {
//     localStorage.removeItem('userDetails');
//     localStorage.removeItem('token');
//     localStorage.removeItem('activeSubMenu');
//     localStorage.removeItem('activeMenu');
//     let path = encodeURIComponent(window.location.href.split('/').pop())
//     navigate({
//         pathname: '/login',
//         search: path,
//     });
//     return {
//         type: LOGOUT_ACTION,
//     };
//     // window.location.reload();
// }



export function loginAction(email, password, navigate, path) {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        login(email, password)
            .then((result) => {
                if (result.status == 200) {
                    dispatch({ type: FETCH_SUCCESS });
                    saveTokenInLocalStorage(result, (res) => { });
                    // runLogoutTimer(
                    //     dispatch,
                    //     result.data.data.expire_time,
                    //     navigate,
                    // );
                    dispatch(loginConfirmedAction(result.data));
                    if(result && result.data && result.data.user && result.data.user.Role === 'admin'){
                        navigate('/admin/dashboard')
                    }else{
                        navigate('/user/dashboard')
                    }
                } else {
                    dispatch({ type: FETCH_ERROR, payload: result.data.message });
                }
            })
            .catch((error) => {
                const errorMessage = formatError(error);
                dispatch(loginFailedAction(errorMessage));
                dispatch({ type: FETCH_ERROR, payload: 'Something went wrong. Please try after some time' });
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
