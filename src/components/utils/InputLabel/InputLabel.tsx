import React, { useState } from "react";
import styles from "./InputLabel.module.css";

interface InputFieldLabelProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  maxLength: number;
  isTextArea?: boolean;
  rows?: number;
}

const InputFieldLabel: React.FC<InputFieldLabelProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  isTextArea = false,
  rows = 3, // Default to 3 rows if not specified
}) => {
  return (
    <div className={styles.inputContainer}>
      {isTextArea ? (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows} // Set rows based on prop
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
      <span className={styles.charCount}>
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default InputFieldLabel;
