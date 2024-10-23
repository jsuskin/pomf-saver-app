import React from "react";
import AssetOptions from "./AssetOptions";
import AddToGroup from "./AddToGroup";
import styles from "../modal.module.css";
import { closeModal as _closeModal } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/app/lib/redux/hooks";

export default function ModalContent({ modalFor }: { modalFor: string | null }) {
  const dispatch = useAppDispatch();
  let Cmp;

  const closeModal = () => {
    dispatch(_closeModal());
  };

  switch (modalFor) {
    case "ASSET_OPTIONS":
      Cmp = () => <AssetOptions closeModal={closeModal} />;
      break;
    case "ADD_TO_GROUP":
      Cmp = () => <AddToGroup closeModal={closeModal} />;
      break;
    default:
      Cmp = () => <></>;
      break;
  }

  return <div className={styles["modal-content"]}><Cmp /></div>;
}
