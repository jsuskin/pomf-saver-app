import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ToastState {
  text: string
}

const initialState: ToastState = {
  text: ""
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastText(state, action) {
      state.text = action.payload
    },
    resetToastText(state) {
      state.text = ""
    }
  },
});

// Export Actions
export const { setToastText, resetToastText } = toastSlice.actions;

// Export Selectors
export const selectToastText = (state: RootState) => state.toast.text;

// Export Reducer
export default toastSlice.reducer;
