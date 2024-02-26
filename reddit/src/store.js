import { configureStore, combineReducers , getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import FormSlice from './slice/FormSlice'; // Adjust the path as necessary

const persistConfig = {
  key: 'root',
  storage,
  // Add other configuration as needed
};

const rootReducer = combineReducers({
  form: FormSlice, // Make sure this matches the export from your slice file
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],

    },
  }),
});

export const persistor = persistStore(store);

export default store;
