import { combineReducers, configureStore } from "@reduxjs/toolkit";
import onBoardingReducer from "./features/onBoardingSlice";

const rootReducer = combineReducers({
  onBoarding: onBoardingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     immutableCheck: false,
  //   }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;