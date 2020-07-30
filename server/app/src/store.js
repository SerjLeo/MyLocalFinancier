import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};

function logger({ getState }) {
    return next => action => {
      console.log('will dispatch', action)
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
      console.log('state after dispatch', getState())
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }

function setToken() {
  return next => action => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    return next(action)
  }
}

const middleware = [thunk, setToken];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;