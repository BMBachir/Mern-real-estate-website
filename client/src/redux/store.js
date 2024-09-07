import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
//fisrsst thing combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});
//second config our presist
const persistConfig = { key: "root", storage, version: 1 };
//third final reducer presist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//and we share it 
export const persistor = persistStore(store);
