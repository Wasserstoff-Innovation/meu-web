import { combineReducers, configureStore } from "@reduxjs/toolkit";
import onBoardingReducer from "./features/onBoardingSlice";
import mainReducer from "./features/mainSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["onBoarding" ,'main'],
};

const rootReducer = combineReducers({
  onBoarding: onBoardingReducer,
  main: mainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     immutableCheck: false,
  //   }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
