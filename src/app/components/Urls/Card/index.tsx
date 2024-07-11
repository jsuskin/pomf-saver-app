"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../urls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { Card } from "../../../../util/types";
import { formatTimestamp } from "../../../../util/helper-methods";

export default function Card({ id, url, createdAt }: Card) {
  const [checked, setChecked] = useState(false);
  
  return (
    <li className={checked ? styles.checked : ""}>
      <Link
        href={url}
        className={styles.card}
        rel='noopener noreferrer'
        target='_blank'
      >
        <div className={styles["card-left"]}>
          <input
            id={`checkbox_${id}`}
            type='checkbox'
            checked={checked}
            onChange={() => {
              setChecked((prev) => !prev);
            }}
          />
          <div>
            <div className={styles["asset-thumbnail"]}>
              <Image
                src={url}
                alt={url}
                fill
                style={{ objectFit: "cover" }}
                sizes='(max-width: 100px) 100vw'
                priority
              />
            </div>
            <p>{url}</p>
          </div>
        </div>
        <div className={styles["card-right"]}>
          <p className={styles["created-at"]}>{formatTimestamp(createdAt)}</p>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </Link>
    </li>
  );
}
