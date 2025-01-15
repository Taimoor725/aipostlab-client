import React, { useEffect, useState } from "react";
import styles from "./BrandColor.module.css";
import Button from "../../utils/Button/Button";
import { FaPalette } from "react-icons/fa";
import ColorPicker from "../../utils/ColorPicker/ColorPicker";
import { useTranslation } from "react-i18next";

interface BrandColorProps {
  colors: string[];
  onColorsChange: (newColors: string[]) => void;
}

const BrandColor: React.FC<BrandColorProps> = ({ colors, onColorsChange }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [brandColors, setBrandColors] = useState(["", "", "", ""]);

  useEffect(() => {
    console.log("Brand Colors:", colors);
    setBrandColors([
      colors[0] || "",
      colors[1] || "",
      colors[2] || "",
      colors[3] || "",
    ]); // Update state when props change
    setIsExpanded(true); // Ensure the panel is expanded when colors change
  }, [colors]);

  const handleExpandToggle = () => setIsExpanded((prev) => !prev);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...brandColors];
    newColors[index] = color;
    setBrandColors(newColors);
    onColorsChange(newColors); // Notify parent component about color changes
  };

  const handleSave = () => {
    console.log("Selected Colors:", brandColors);
    // Add your save logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleExpandToggle}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>
            <FaPalette />
          </span>
        </div>
        <h2 className={styles.title}>{t("BrandColor.title")}</h2>
        <div className={styles.expandIcon}>{isExpanded ? "-" : "+"}</div>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.colorPicker}>
            {brandColors.map((color, index) => (
              <ColorPicker
                key={index}
                label={
                  index < 2
                    ? t("BrandColor.brandColor", { index: index + 1 })
                    : t("BrandColor.additionalColor", { index: index - 1 })
                }
                color={color}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
              />
            ))}
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              label={t("BrandColor.saveAndContinue")}
              onClick={handleSave}
              color="#9a32ef"
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandColor;
