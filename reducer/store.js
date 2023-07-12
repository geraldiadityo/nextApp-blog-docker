import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/auth-slice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER, PAUSE } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PAUSE, REGISTER],
            }
        }),
});

const persistor = persistStore(store);

export { store, persistor };
