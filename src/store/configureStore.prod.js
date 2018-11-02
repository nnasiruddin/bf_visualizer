import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// Without middleware, Redux only supports synchronous data flow. http://redux.js.org/docs/advanced/AsyncFlow.html
// So we're applying the thunk middleware to support async (ajax calls) within our actions.
// To clarify, middleware simply lets us slap some behavior in between dispatching an action
// and the moment it reaches the reducer. You can do other things like log, crash report, route, and so on.
// Thunk middleware lets us dispatch() functions, (useful for handling ajax calls in reducers)
export const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
    return store;
};
