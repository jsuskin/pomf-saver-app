import React, { useEffect, useState, useRef } from "react";
import type { MenuOption, ContextMenu } from "@/util/types";
import styles from "./contextMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function ContextMenu({
  containerStyle = "",
  menuHeaderStyle = "",
  menuHeaderText = "",
  menuOptions = [],
  closeMenu,
}: ContextMenu) {
  const [rectBottom, setRectBottom] = useState(0);
  const ref = useRef<HTMLUListElement | null>(null);

  const windowHeight = window.innerHeight;

  useEffect(() => {
    if (ref.current) setRectBottom(ref.current.getBoundingClientRect().bottom);

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <ul
      style={{
        bottom: rectBottom < windowHeight ? "auto" : "30px",
        top: rectBottom < windowHeight ? "30px" : "auto",
      }}
      className={`${containerStyle} ${styles["context-menu"]}`}
      ref={ref}
    >
      {menuHeaderText && (
        <h3 className={`${menuHeaderStyle} ${styles["context-menu-header"]}`}>{menuHeaderText}</h3>
      )}
      {menuOptions.map(({ text, handleClick, icon, ...menuOption }: MenuOption, idx: number) => (
        <li
          className={`${styles["menu-option"]} ${
            "color" in menuOption && styles[menuOption.color as string]
          }`}
          key={idx}
          onClick={handleClick}
        >
          {icon && <FontAwesomeIcon className={styles["menu-option-icon"]} icon={icon} />}
          <p>{text}</p>
          {"extendable" in menuOption && (
            <FontAwesomeIcon
              size='lg'
              className={styles["menu-option-carat-right"]}
              icon={faCaretRight}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
