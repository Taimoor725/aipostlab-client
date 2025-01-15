import React from "react";
import styles from "./Button.module.css";
import { SvgIconComponent } from "@mui/icons-material";

interface ButtonProps {
  label: string; // Button text
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function to call on click
  color?: string; // Optional color prop for button background
  size?: "small" | "medium" | "large"; // Size prop for button
  disabled?: boolean; // Optional disabled state
  Icon?: SvgIconComponent;
  className?: string; // Add this line
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "#9a32ef", // Default color
  size = "medium", // Default size
  disabled = false, // Default disabled state
  Icon,
  className,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
      {Icon && (
        <span className={styles.icon}>
          {
            <Icon
              fontSize="inherit"
              sx={{ fontSize: 30, transform: "scale(0.9)" }}
            />
          }
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};

export default Button;
