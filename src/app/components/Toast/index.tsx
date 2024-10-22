import React, { useEffect } from "react";
import styles from "./toast.module.css";
import { selectToastText, resetToastText } from "@/app/lib/redux/features/toast/toastSlice";
import { useAppSelector, useAppDispatch } from "@/app/lib/redux/hooks";

export default function Toast() {
  const text = useAppSelector(selectToastText);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (text.length) {
      setTimeout(() => {
        dispatch(resetToastText());
      }, 3000);
    }
  }, [text]);

  return (
    <div className={`${styles.toast} ${text.length && styles.show}`}>
      <p>{text}</p>
    </div>
  );
}
