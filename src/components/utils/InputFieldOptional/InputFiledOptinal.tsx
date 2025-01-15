import React from "react";
import styles from "./InputFieldOptional.module.css";

interface InputFieldOptionalProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  maxLength: number;
  isTextArea?: boolean;
  rows?: number;
}

const InputFieldOptional: React.FC<InputFieldOptionalProps> = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  isTextArea = false,
  rows = 1,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {isTextArea ? (
          <textarea
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={rows}
          />
        ) : (
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
        <span className={styles.optionalText}>Optional</span>
      </div>
    </div>
  );
};

export default InputFieldOptional;
