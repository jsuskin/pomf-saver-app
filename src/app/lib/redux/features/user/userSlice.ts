import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UserState {
  isLoggedIn: boolean;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, displayName, photoURL } = action.payload;

      state.isLoggedIn = true;
      state.uid = uid;
      state.displayName = displayName;
      state.photoURL = photoURL;
    },
    unsetUser(state) {
      state.isLoggedIn = false;
      state.uid = null;
      state.displayName = null;
      state.photoURL = null;
    },
  },
});

// Export Actions
export const { setUser, unsetUser } = userSlice.actions;

// Export Selectors
export const selectUser = (state: RootState) => state.user;

// Export Reducer
export default userSlice.reducer;
