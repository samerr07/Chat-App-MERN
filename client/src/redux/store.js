import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import userSlice from "./userSlice";
import messageSlice from "./messageSlice";
import storage from 'redux-persist/lib/storage'
import socketSlice from "./socketSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    user: userSlice,
    message : messageSlice,
    socket: socketSlice
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

// const store = configureStore({
//     reducer:{
//         user: userSlice,
//         message : messageSlice
//     }
// })

export default store;