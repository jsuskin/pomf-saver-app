import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCopy,
  faPencil,
  faCloudArrowDown,
  faPlus,
  faVault,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import ContextMenu from "../../../ContextMenu";
import { initAddAssetToGroupModal, openModal } from "@/app/lib/redux/features/modal/modalSlice";
import styles from "../../urls.module.css";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { initRenameAssetModal } from "@/app/lib/redux/features/modal/modalSlice";
import { setToastText } from "@/app/lib/redux/features/toast/toastSlice";
import type { MoreOptions } from "@/util/types";

export default function MoreOptions({ showMenu, closeMenu, name, url, id }: MoreOptions) {
  const dispatch = useAppDispatch();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    closeMenu();
    dispatch(setToastText("Link Copied"));
  };

  const handleRenameAsset = async () => {
    closeMenu(); // Close the context menu first
    await Promise.resolve(); // Wait for the next event loop tick to ensure state has been updated
    dispatch(initRenameAssetModal({ name, id })); // Assign values to modal state
  };

  const handleDownloadFile = async () => {
    const downloadUrl = `/api/download-file?url=${url}&name=${name}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${name}.${url.split(".").slice(-1)[0]}`);
    link.click();
    closeMenu();
  };

  const menuOptions = [
    {
      icon: faCopy,
      text: "Copy Link",
      handleClick: handleCopyLink,
    },
    {
      icon: faPencil,
      text: "Rename",
      handleClick: handleRenameAsset,
    },
    {
      icon: faCloudArrowDown,
      text: "Download",
      handleClick: handleDownloadFile,
    },
    {
      icon: faCircleInfo,
      text: "Info",
      handleClick: () => {
        console.log("asset info");
      },
    },
    {
      icon: faPlus,
      text: "Add to Group",
      handleClick: () => {
        console.log("add to group");
        /* !!TEMP!! */
        dispatch(initAddAssetToGroupModal({ id }));
      },
      extendable: true,
    },
    {
      icon: faVault,
      text: "Move to Vault",
      hoverText: "",
      handleClick: () => {
        console.log("move to vault");
      },
      color: "red",
    },
  ];

  return (
    <>
      {showMenu && (
        <ContextMenu {...{ menuOptions, closeMenu }} containerStyle={styles["menu-container"]} />
      )}
      <FontAwesomeIcon icon={faEllipsis} />
    </>
  );
}
