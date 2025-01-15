import React, { useState, useRef, useEffect } from "react";
import { ColorResult } from "react-color";
import styles from "./ColorPicker.module.css";
import { Sketch } from "@uiw/react-color";

interface ColorPickerProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onColorChange,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const togglePicker = () => setIsPickerOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node)
    ) {
      setIsPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.colorPickerContainer}>
      <p className={styles.label}>{label}</p>
      <div style={{ position: "relative" }}>
        <div
          className={styles.colorDisplay}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click from propagating and triggering handleClickOutside
            togglePicker();
          }}
          style={{ backgroundColor: color || "#ffffff" }}
        >
          {color || "Select Color"}
        </div>
        {isPickerOpen && (
          <div ref={colorPickerRef} className={styles.colorPicker}>
            <Sketch
              color={color}
              onChange={(color) => onColorChange(color.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ColorPicker;
