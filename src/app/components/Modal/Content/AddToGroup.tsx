import React, { useState, useEffect } from "react";
import { selectModalData } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppSelector } from "@/app/lib/redux/hooks";
import styles from "../modal.module.css";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { setToastText } from "@/app/lib/redux/features/toast/toastSlice";
import { selectUser } from "@/app/lib/redux/features/user/userSlice";
import axios from "axios";

export default function AssetOptionsModalContent({ closeModal }: any) {
  const [textInputValue, setTextInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("")
  const modalData = useAppSelector(selectModalData);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleAddAssetToGroup = async (e: any) => {
    e.preventDefault();

    axios
      .post("/api/groups", {
        name: textInputValue,
        owner: user.uid,
        members: [modalData!.docId],
      })
      .then((res) => {
        console.log("Successfully added to group: ", res);
        closeModal();
        dispatch(setToastText("Successfully added to group"));
      })
      .catch((e) => {
        console.error("Unable to add to group: ", e);
      });
  };

  useEffect(() => {
    // if (modalData) setTextInputValue(modalData.name);
    console.log({modalData})
  }, [modalData]);

  return (
    <>
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
    </>
  );
}
