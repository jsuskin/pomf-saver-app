import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./checkbox.module.css";

export default function Checkbox({ handleChange = () => {}, checked = false, setChecked }: {handleChange: any, checked?: boolean, setChecked: Dispatch<SetStateAction<boolean>>}) {
  
  return (
    <div className={styles.container}>
      <input
        type='checkbox'
        onClick={e => {
          e.stopPropagation();
        }}
        onChange={() => {
          setChecked(prev => !prev);
          handleChange();
        }}
        checked={checked}
      />
      <span className='checkmark'></span>
    </div>
  );
}
