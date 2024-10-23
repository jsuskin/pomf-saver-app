import React, { useState, useEffect } from "react";
import { selectModalData } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppSelector } from "@/app/lib/redux/hooks";
import styles from "../modal.module.css";
import { updateDocument } from "@/app/lib/firebase/firestore";
import { useAppDispatch } from "@/app/lib/redux/hooks";

import { setToastText } from "@/app/lib/redux/features/toast/toastSlice";

export default function AssetOptionsModalContent({ closeModal }: any) {
  const [textInputValue, setTextInputValue] = useState("");
  const modalData = useAppSelector(selectModalData);
  const dispatch = useAppDispatch();

  const handleRenameDoc = async (e: any) => {
    e.preventDefault();

    if (modalData) {
      try {
        await updateDocument("urls", modalData.docId, { name: textInputValue });
        closeModal();
        dispatch(setToastText("Asset Renamed Successfully"))
      } catch(error) {
        console.log("error updated doc:", error)
      }
    }
  };

  useEffect(() => {
    if (modalData) setTextInputValue(modalData.name);
  }, [modalData]);

  return (
    <>
      <label htmlFor='rename' className={styles["modal-input-label"]}>
        Rename Asset
      </label>
      <input
        type='text'
        name='rename'
        value={textInputValue}
        placeholder='Enter new asset name'
        onChange={(e) => {
          setTextInputValue(e.target.value);
        }}
      />
      <div className={styles.buttons}>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleRenameDoc}>Rename</button>
      </div>
    </>
  );
}
