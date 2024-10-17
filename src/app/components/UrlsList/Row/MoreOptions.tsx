import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCopy, faPencil } from "@fortawesome/free-solid-svg-icons";
import ContextMenu from "../../ContextMenu";
import { openModal } from "@/app/lib/redux/features/modal/modalSlice";
import styles from "../urls.module.css";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { initRenameAssetModal } from "@/app/lib/redux/features/modal/modalSlice";

interface MoreOptions {
  showMenu: boolean;
  closeMenu: () => void;
  url: string;
}

export default function MoreOptions({ showMenu, closeMenu, url }: MoreOptions) {
  const dispatch = useAppDispatch();

  return (
    <>
      {showMenu && (
        <ContextMenu
          {...{
            containerStyle: styles["menu-container"],
            menuOptions: [
              {
                icon: faCopy,
                text: "Copy Link",
                handleClick: () => {
                  navigator.clipboard.writeText(url);
                  closeMenu();
                },
              },
              {
                icon: faPencil,
                text: "Rename",
                handleClick: async () => {
                  closeMenu(); // Close the context menu first
                  await Promise.resolve(); // Wait for the next event loop tick to ensure state has been updated
                  dispatch(initRenameAssetModal({ url }));
                },
              },
            ],
            closeMenu,
          }}
        />
      )}
      <FontAwesomeIcon icon={faEllipsis} />
    </>
  );
}
