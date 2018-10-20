import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import questionReducer from './reducers/question';
import authReducer from './reducers/auth';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { loadAuthToken } from './local-storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    questions: questionReducer,
    form: formReducer,
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
