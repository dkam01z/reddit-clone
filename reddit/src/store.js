import { configureStore, combineReducers , getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import FormSlice from './slice/FormSlice'; // Adjust the path as necessary
import Hotslice from './slice/PostsSlice';
import VoteSlice from './slice/userVoteSlice';
import commentSlice from './slice/commentSlice';
import CommunitySlice from './slice/CommunitySlice';

const persistConfig = {
  key: 'root',
  storage,
  
};

const rootReducer = combineReducers({
  form: FormSlice,
  post: Hotslice,
  userVotes: VoteSlice,
  comments: commentSlice,
  community: CommunitySlice
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
