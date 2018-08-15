import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from '../reducers/index';

const persistConfig = {
	key: 'root',
	storage: storage,
};
const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT_USER') {
		localStorage.clear();
		Object.keys(state).forEach(key => (storage.removeItem(`persist:${key}`)));
        state = undefined;
	}
    return appReducer(state, action);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
	const store = createStore(
		persistedReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
	const persistor = persistStore(store);
	return { store, persistor };
}