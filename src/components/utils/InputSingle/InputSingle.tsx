import React from "react";
import styles from "./InputSingle.module.css";

interface InputFieldSingleProps {
  label: string; // Label text
  value: string; // Current input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  type?: string; // Type of input (text, url, etc.)
  placeholder?: string; // Placeholder text
}

const InputFieldSingle: React.FC<InputFieldSingleProps> = ({
  label,
  value,
  onChange,
  type = "text", // Default type is text
  placeholder = "", // Default placeholder is empty
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default InputFieldSingle;
