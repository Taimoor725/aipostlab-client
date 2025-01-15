import React, { useState, useEffect } from "react";
import styles from "./DropDown.module.css";
interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  selectedValue?: string; // Add selectedValue prop
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  selectedValue,
}) => {
  const [selected, setSelected] = useState(selectedValue || ""); // Initialize with selectedValue
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue); // Update selected state when selectedValue changes
    }
  }, [selectedValue]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdown} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.label}>{selected || label}</span>
        <span className={styles.arrow}></span>
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
