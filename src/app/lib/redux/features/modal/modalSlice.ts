import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ModalState {
  show: boolean;
  for: string | null;
  data: { [key: string]: string } | null;
}

const initialState: ModalState = {
  show: false,
  for: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.show = true;
    },
    closeModal(state) {
      state.show = false;
      state.for = null;
      state.data = null;
    },
    initRenameAssetModal(state, action) {
      state.show = true;
      state.for = "ASSET_OPTIONS";
      state.data = { name: action.payload.name, docId: action.payload.id };
    },
    initAddAssetToGroupModal(state) {
      state.show = true;
      state.for = "ADD_TO_GROUP";
    }
  },
});

// Export Actions
export const { openModal, closeModal, initRenameAssetModal, initAddAssetToGroupModal } =
  modalSlice.actions;

// Export Selectors
export const selectShowModal = (state: RootState) => state.modal.show;
export const selectModalFor = (state: RootState) => state.modal.for;
export const selectModalData = (state: RootState) => state.modal.data;

// Export Reducer
export default modalSlice.reducer;
