import React from "react";
import styles from "./InputModern.module.css";

interface InputModernProps {
  label: string;
  placeholder: string;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputModern: React.FC<InputModernProps> = ({
  label,
  placeholder,
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange ?? (() => {})}
      />
    </div>
  );
};

export default InputModern;
