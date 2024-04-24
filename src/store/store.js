// import { createStore } from 'redux';
// import reducer from './reducer';

// // ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);
// const persister = 'Free';

// export { store, persister };



/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(rootReducer(history), initialState, composeEnhancers(applyMiddleware(...middlewares)));

    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer', () => {
            const nextRootReducer = require('./reducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
export { history };

