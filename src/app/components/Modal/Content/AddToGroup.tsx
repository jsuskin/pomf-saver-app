import React, { useState, useEffect } from "react";
import { selectModalData } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppSelector } from "@/app/lib/redux/hooks";
import styles from "../modal.module.css";
import { updateDocument } from "@/app/lib/firebase/firestore";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { closeModal as _closeModal } from "@/app/lib/redux/features/modal/modalSlice";
import { setToastText } from "@/app/lib/redux/features/toast/toastSlice";

export default function AssetOptionsModalContent() {
  const [textInputValue, setTextInputValue] = useState("");
  const modalData = useAppSelector(selectModalData);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(_closeModal());
  };

  const handleAddAssetToGroup = () => {};

  useEffect(() => {
    if (modalData) setTextInputValue(modalData.name);
  }, [modalData]);

  return (
    <div className={styles["modal-content"]}>
      <label htmlFor='addToNewGroup' className={styles["modal-input-label"]}>
        Create New Group
      </label>
      <input
        type='text'
        name='addToNewGroup'
        value={textInputValue}
        placeholder='Enter New Group Name'
        onChange={(e) => {
          setTextInputValue(e.target.value);
        }}
      />
      <div className={styles.separator}>
        <hr />
        <p>OR</p>
        <hr />
      </div>
      <label htmlFor='addToExistingGroup' className={styles["modal-input-label"]}>
        Add To Existing Group
      </label>
      <select name='addToExistingGroup' defaultValue="default">
        <option value='default' disabled>
          Select a Group
        </option>
        <option value='group 1'>Group 1</option>
        <option value='group 2'>Group 2</option>
        <option value='group 3'>Group 3</option>
      </select>
      <div className={styles.buttons}>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleAddAssetToGroup}>Add</button>
      </div>
    </div>
  );
}
