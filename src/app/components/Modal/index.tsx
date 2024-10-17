import React, { Dispatch, SetStateAction } from "react";
import styles from "./modal.module.css";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { selectShowModal, closeModal } from "@/app/lib/redux/features/modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children }: any) {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(selectShowModal);

  return (
    <div
      className={`${styles["modal-container"]} ${showModal && styles.show}`}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FontAwesomeIcon icon={faX} className={styles["close-modal-X"]} />
        {children}
      </div>
    </div>
  );
}
