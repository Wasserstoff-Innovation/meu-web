import { combineReducers, configureStore } from "@reduxjs/toolkit";
import onBoardingReducer from "./features/onBoardingSlice";
import friendRequestReducer from "./features/friendRequestSlice";
import gotFriendRequestReducer  from "./features/gotFriendRequestsSlice";
import mainReducer from "./features/mainSlice";
import popupReducer from "./features/popupSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["onBoarding", "main","friendRequest, gotFriendRequest"],
  // serialize: false,
  // deserialize: false,
};

const rootReducer = combineReducers({
  onBoarding: onBoardingReducer,
  main: mainReducer,
  popup: popupReducer,
  friendRequest:friendRequestReducer,
  gotFriendRequest:gotFriendRequestReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
