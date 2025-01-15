import React from "react";
import styles from "./InputModern3.module.css";

interface InputModernProps {
  placeholder: string;
}

const InputModern3: React.FC<InputModernProps> = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder={placeholder} />
    </div>
  );
};

export default InputModern3;
