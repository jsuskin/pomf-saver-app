import React, { useState, useEffect } from "react";
import { selectModalData } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppSelector } from "@/app/lib/redux/hooks";
import styles from "./modal.module.css";

export default function ModalContent({ modalFor }: { modalFor: string | null }) {
  const [textInputValue, setTextInputValue] = useState("");
  const modalData = useAppSelector(selectModalData);

  useEffect(() => {
    if (modalData) setTextInputValue(modalData.url);
  }, [modalData]);

  switch (modalFor) {
    case "ASSET_OPTIONS":
      return (
        <div className={styles["modal-content"]}>
          <label htmlFor='rename' className={styles["modal-input-label"]}>Rename Asset</label>
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
            <button
              onClick={() => {
                console.log("rename cancelled");
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("rename asset", { textInputValue });
              }}
            >
              Rename
            </button>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}
