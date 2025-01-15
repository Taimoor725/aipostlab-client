import React from "react";
import styles from "./StyleBox.module.css";

const StyleBox = ({
  id,
  imageSrc,
  onClick,
  isSelected,
}: {
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  isSelected: boolean;
}) => {
  const imageUrl = `data:image/jpeg;base64,${imageSrc}`;
  return (
    <div
      className={`${styles.square} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(id)}
    >
      <img src={imageUrl} alt="style" />
    </div>
  );
};

export default StyleBox;
