import React, { Suspense, useState } from "react";
import styles from "../urls.module.css";
import Checkbox from "../../Checkbox";
import type { Row } from "@/util/types";
import { timestampToMMDDYYHHMM } from "@/util/helper-methods";
import AssetThumbnail from "./AssetThumbnail";
import MoreOptions from "./MoreOptions";

export default function Row({ id, url, ownerDisplayName, createdAt, selected, setSelected }: Row) {
  const [showMenu, setShowMenu] = useState(false);

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
        <AssetThumbnail url={url} />
        <div className={styles["asset-path-container"]}>
          <p className={styles["asset-path"]}>{url}</p>
        </div>
      </td>
      <td>{timestampToMMDDYYHHMM(createdAt)}</td>
      <td>{ownerDisplayName}</td>
      <td
        className={styles["more-options"]}
        onClick={(e) => {
          e.stopPropagation();
          if(!showMenu) setShowMenu(true);
        }}
      >
        <MoreOptions showMenu={showMenu} closeMenu={() => setShowMenu(false)} url={url} />
      </td>
    </tr>
  );
}
