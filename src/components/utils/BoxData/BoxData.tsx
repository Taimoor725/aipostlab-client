import React from "react";
import styles from "./BoxData.module.css";

interface BoxDataProps {
  leftText: string;
  icon: React.ReactNode;
  rightText: string;
}

const BoxData: React.FC<BoxDataProps> = ({ leftText, icon, rightText }) => {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <span className={styles.boldText}>{leftText}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.right}>{rightText}</div>
    </div>
  );
};

export default BoxData;
