import React from "react";
import styles from "./ButtonIcon.module.css";

interface ButtonIconProps {
  label: string; // Button text
  onClick: () => void; // Function to call on click
  color?: string; // Optional color prop for button background
  size?: "small" | "medium" | "large" | "customSmall"; // Size prop for button
  icon: React.ReactNode; // Icon to display on the right side
  disabled?: boolean; // Optional disabled state
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  label,
  onClick,
  color = "#9a32ef", // Default color
  size = "medium", // Default size
  icon,
  disabled = false, // Default disabled state
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
      {label}
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};

export default ButtonIcon;
