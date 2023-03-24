import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import storage from "reduxjs-toolkit-persist/lib/storage"
import logger from "redux-logger"
import counterReducer from "./counter"
import authReducer from "./auth"

const reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
})

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["counter"],
}

const _persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "auth/login/fulfilled",
        ],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)
