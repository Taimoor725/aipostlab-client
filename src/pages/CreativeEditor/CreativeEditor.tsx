import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Add useLocation to get state
import styles from "./CreativeEditor.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import ToolBox from "../../components/CreativeEditor/ToolBox/ToolBox";
import ImageEditor from "../../components/CreativeEditor/ImageEditor/ImageEditor";

// Import default images
import defaultBackground from "../../assets/bg.png";
import defaultLogo from "../../assets/aiposlab_logo.jpg";
import ToolBoxNew from "../../components/CreativeEditor/ToolBox/ToolBoxNew";
import ImageEditorNew from "../../components/CreativeEditor/ImageEditor/ImageEditorNew";

export interface Shape {
  id: string;
  type: "circle" | "rectangle" | "triangle" | "star" | "heart"; // Add triangle, star, and heart shapes
  color: string;
  x: number;
  y: number;
  filled: boolean; // Add filled property
  size?: number;
}

export interface Text {
  id: string;
  content: string;
  color: string;
  x: number;
  y: number;
  fontSize?: number;
  fontStyle?: "Regular" | "Bold" | "Italic";
  font?: string; // Add font property
  transform?: string;
}

const CreativeEditor: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Remove type argument
  const state = location.state as {
    image: string;
    layers: Text[];
    logo: string;
    imageSize: string;
    initialPositions: {
      headline: { top: string; left: string; transform: string };
      punchline: { top: string; left: string; transform: string };
      callToActionText: { top: string; left: string; transform: string };
      logo: { top: string; left: string };
    };
  }; // Use type assertion
  console.log("state", state);
  const [image, setImage] = useState(state?.image || defaultBackground); // Set default background image
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [texts, setTexts] = useState<Text[]>(state?.layers || []); // Set initial layers
  const [activeTool, setActiveTool] = useState<"pointer" | "shapes" | "text">(
    "pointer"
  );
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [logo, setLogo] = useState(state?.logo || defaultLogo); // Set default logo

  // Determine canvas size based on imageSize
  const [canvasWidth, canvasHeight] = (() => {
    switch (state?.imageSize) {
      case "Post Size":
        return [1080, 1080];
      case "Landscape Size":
        return [1200, 628];
      case "Story Size":
        return [1080, 1920];
      default:
        return [1000, 1000];
    }
  })();

  // Set zoom level
  const zoomLevel = 0.5;

  // Adjust initial positions based on zoom level
  useEffect(() => {
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === "headline") {
          return {
            ...text,
            x: parseFloat(state.initialPositions.headline.left),
            y: parseFloat(state.initialPositions.headline.top),
            transform: state.initialPositions.headline.transform,
          };
        } else if (text.id === "punchline") {
          return {
            ...text,
            x: parseFloat(state.initialPositions.punchline.left),
            y: parseFloat(state.initialPositions.punchline.top),
            transform: state.initialPositions.punchline.transform,
          };
        } else if (text.id === "callToActionText") {
          return {
            ...text,
            x: parseFloat(state.initialPositions.callToActionText.left),
            y: parseFloat(state.initialPositions.callToActionText.top),
            transform: state.initialPositions.callToActionText.transform,
          };
        }
        return text;
      })
    );
  }, [zoomLevel]);

  const addShape = (shape: Shape) => setShapes([...shapes, shape]);
  const addText = (text: Text) => setTexts([...texts, text]);

  const updateShape = (id: string, updatedProps: Partial<Shape>) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === id ? { ...shape, ...updatedProps } : shape
      )
    );
  };

  const updateText = (id: string, updatedProps: Partial<Text>) => {
    setTexts(
      texts.map((text) =>
        text.id === id ? { ...text, ...updatedProps } : text
      )
    );
  };

  const downloadImage = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl gap-6 m-6 p-6">

      <div className="flex items-start justify-start gap-4 w-full">
        <img width={"50px"} height={"80px"} src={"/icons/edit_square.svg"} />
        <div className="flex flex-col">
          <h1 className="font-bold text-brPrimary text-2xl">{t("CreativeEditor.title")}</h1>
          <p className="text-base">{t("CreativeEditor.subtitle")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between relative">
        <ToolBoxNew />
        <ImageEditorNew />
      </div>
    </div>
  );
};

export default CreativeEditor;
