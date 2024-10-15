import React, { Dispatch, SetStateAction } from "react";
import styles from "./modal.module.css";

export default function Modal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${styles["modal-container"]} ${showModal && styles.show}`}
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></div>
    </div>
  );
}
