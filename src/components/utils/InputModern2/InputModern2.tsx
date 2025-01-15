import React from "react";
import styles from "./InputModern2.module.css";

interface InputModernProps {
  placeholder: string;
  icon: React.ReactNode;
}

const InputModern2: React.FC<InputModernProps> = ({ icon, placeholder }) => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder={placeholder} />
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};

export default InputModern2;
