import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import toastReducer from "./features/toast/toastSlice";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { modal: modalReducer, toast: toastReducer, user: userReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
