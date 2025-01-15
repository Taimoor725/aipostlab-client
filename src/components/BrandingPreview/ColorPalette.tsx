import React from "react";
import styles from "./BrandingPreview.module.css";

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div className={styles.colorPalette}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.colorCircle}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
