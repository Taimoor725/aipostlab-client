import React from "react";
import styles from "./ButtonIconSecondary.module.css";
import theme from "../../../config/theme";

interface ButtonIconSecondaryProps {
  label: string; // Button text
  onClick: () => void; // Function to call on click
  color?: string; // Optional color prop for button background
  size?: "small" | "medium" | "large"; // Size prop for button
  icon: React.ReactNode; // Icon to display on the right side
  disabled?: boolean; // Optional disabled state
}

const ButtonIconSecondary: React.FC<ButtonIconSecondaryProps> = ({
  label,
  onClick,
  // Default color
  color = theme.palette.background.paper,
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

export default ButtonIconSecondary;
