import React, { Dispatch, SetStateAction } from "react";
import styles from "./modal.module.css";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  selectShowModal,
  closeModal as _closeModal,
} from "@/app/lib/redux/features/modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children }: any) {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(selectShowModal);
  const closeModal = () => {
    dispatch(_closeModal());
  };

  return (
    <div
      className={`${styles["modal-container"]} ${showModal && styles.show}`}
      onClick={closeModal}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FontAwesomeIcon icon={faX} className={styles["close-modal-X"]} onClick={closeModal} />
        {children}
      </div>
    </div>
  );
}
