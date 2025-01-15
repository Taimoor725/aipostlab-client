import React from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  size?: "small" | "medium" | "large";
  bgColor?: string;
  iconColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  size = "medium",
  bgColor = "#007bff", // Default background color
  iconColor = "#ffffff", // Default icon color
}) => {
  return (
    <button
      className={`${styles.iconButton} ${styles[size]}`}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: iconColor }}
    >
      <span className={styles.icon} style={{ color: iconColor }}>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
