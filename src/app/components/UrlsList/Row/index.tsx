import React, { Suspense, useState } from "react";
import Image from "next/image";
import styles from "../urls.module.css";
import VideoPlayer from "../../VideoPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCopy, faPencil } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../Checkbox";
import ContextMenu from "../../ContextMenu";
import type { Row } from "@/util/types";

type Timestamp = { seconds: number; nanoseconds: number };

export default function Row({ id, url, ownerDisplayName, createdAt, selected, setSelected, setShowModal }: Row) {
  const [showMenu, setShowMenu] = useState(false);

  function timestampToDate(timestamp: Timestamp) {
    const date = new Date(timestamp.seconds * 1000);

    // Helper function to pad single digit numbers with leading zeros
    const pad = (num: number) => String(num).padStart(2, "0");

    // Format the Date object into MM/DD/YY, HH:MM format
    const formattedDate = `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${String(
      date.getFullYear()
    ).slice(-2)}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;

    return formattedDate;
  }

  return (
    <tr
      className={styles.row}
      key={id}
      onClick={(e) => {
        e.preventDefault();
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <td>
        <Checkbox handleChange={() => {}} checked={selected} setChecked={setSelected} />
      </td>
      <td className={styles.asset}>
        <div className={styles["asset-thumbnail"]}>
          {url.split(".").pop() === "mp4" ? (
            <Suspense fallback={<p>Loading video...</p>}>
              <VideoPlayer src={url} />
            </Suspense>
          ) : (
            <Image
              src={url}
              alt={url}
              fill
              style={{ objectFit: "cover" }}
              sizes='(max-width: 100px) 100vw'
              priority
            />
          )}
        </div>
        <div className={styles["asset-path-container"]}>
          <p className={styles["asset-path"]}>{url}</p>
        </div>
      </td>
      <td>{timestampToDate(createdAt)}</td>
      <td>{ownerDisplayName}</td>
      <td
        className={styles["more-options"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
                    setShowMenu(false);
                  },
                },
                { icon: faPencil, text: "Rename", handleClick: () => {
                  setShowMenu(false);
                  setShowModal(true);
                } },
              ],
              setShowMenu,
            }}
          />
        )}
        <FontAwesomeIcon
          icon={faEllipsis}
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        />
      </td>
    </tr>
  );
}