import React, { useEffect, useRef } from "react";
import type { MenuOption, ContextMenu } from "@/util/types";
import styles from "./contextMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContextMenu({
  containerStyle = "",
  menuHeaderStyle = "",
  menuHeaderText = "",
  menuOptions = [],
  setShowMenu,
}: ContextMenu) {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false); // Close the menu if click is outside
      }
    };

    // Attach event listener for clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <ul className={`${containerStyle} ${styles["context-menu"]}`} ref={ref}>
      {menuHeaderText && (
        <h3 className={`${menuHeaderStyle} ${styles["context-menu-header"]}`}>{menuHeaderText}</h3>
      )}
      {menuOptions.map(({ text, handleClick, icon }: MenuOption, idx: number) => (
        <li className={styles['menu-option']} key={idx} onClick={handleClick}>
          {icon && <FontAwesomeIcon className={styles['menu-option-icon']} icon={icon} />}
          <p>{text}</p>
        </li>
      ))}
    </ul>
  );
}
