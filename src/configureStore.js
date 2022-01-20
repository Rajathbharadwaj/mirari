import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import appReducer from "./reducers/AppReducer";

const isBrowserDevTools =
	typeof window !== "undefined" && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = isBrowserDevTools ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export function configureStore() {
	const rootReducer = appReducer;
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
	return store;
}
