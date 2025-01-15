import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageEditor.module.css";
import { Shape, Text } from "../../../pages/CreativeEditor/CreativeEditor";

interface ImageEditorProps {
  image: string;
  shapes: Shape[];
  texts: Text[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  setTexts: React.Dispatch<React.SetStateAction<Text[]>>;
  activeTool: "pointer" | "shapes" | "text";
  setSelectedLayer: (id: string | null) => void;
  logo: string; // Add logo prop
  canvasWidth: number; // Add canvas width prop
  canvasHeight: number; // Add canvas height prop
  zoomLevel: number; // Add zoom level prop
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  shapes,
  texts,
  setShapes,
  setTexts,
  activeTool,
  setSelectedLayer,
  logo, // Add logo prop
  canvasWidth, // Add canvas width prop
  canvasHeight, // Add canvas height prop
  zoomLevel, // Add zoom level prop
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLayer, setSelectedLayerState] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Function to render shapes and texts
    const renderShapesAndTexts = () => {
      // Draw shapes
      shapes.forEach(({ type, color, x, y, filled, size }) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        const shapeSize = (size || 30) * zoomLevel;
        const scaledX = x * zoomLevel;
        const scaledY = y * zoomLevel;
        if (type === "circle") {
          ctx.beginPath();
          ctx.arc(scaledX, scaledY, shapeSize, 0, Math.PI * 2);
          if (filled) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        } else if (type === "rectangle") {
          if (filled) {
            ctx.fillRect(
              scaledX - shapeSize,
              scaledY - shapeSize,
              shapeSize * 2,
              shapeSize * 2
            );
          } else {
            ctx.strokeRect(
              scaledX - shapeSize,
              scaledY - shapeSize,
              shapeSize * 2,
              shapeSize * 2
            );
          }
        } else if (type === "triangle") {
          ctx.beginPath();
          ctx.moveTo(scaledX, scaledY - shapeSize);
          ctx.lineTo(scaledX + shapeSize, scaledY + shapeSize);
          ctx.lineTo(scaledX - shapeSize, scaledY + shapeSize);
          ctx.closePath();
          if (filled) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        } else if (type === "star") {
          const outerRadius = shapeSize;
          const innerRadius = shapeSize / 2;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(
              scaledX +
                outerRadius * Math.cos((i * 2 * Math.PI) / 5 - Math.PI / 2),
              scaledY +
                outerRadius * Math.sin((i * 2 * Math.PI) / 5 - Math.PI / 2)
            );
            ctx.lineTo(
              scaledX +
                innerRadius *
                  Math.cos(((i + 0.5) * 2 * Math.PI) / 5 - Math.PI / 2),
              scaledY +
                innerRadius *
                  Math.sin(((i + 0.5) * 2 * Math.PI) / 5 - Math.PI / 2)
            );
          }
          ctx.closePath();
          if (filled) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        } else if (type === "heart") {
          ctx.beginPath();
          ctx.moveTo(scaledX, scaledY);
          ctx.bezierCurveTo(
            scaledX,
            scaledY - shapeSize,
            scaledX - shapeSize,
            scaledY - shapeSize,
            scaledX - shapeSize,
            scaledY
          );
          ctx.bezierCurveTo(
            scaledX - shapeSize,
            scaledY + shapeSize,
            scaledX,
            scaledY + shapeSize,
            scaledX,
            scaledY + shapeSize * 2
          );
          ctx.bezierCurveTo(
            scaledX,
            scaledY + shapeSize,
            scaledX + shapeSize,
            scaledY + shapeSize,
            scaledX + shapeSize,
            scaledY
          );
          ctx.bezierCurveTo(
            scaledX + shapeSize,
            scaledY - shapeSize,
            scaledX,
            scaledY - shapeSize,
            scaledX,
            scaledY
          );
          ctx.closePath();
          if (filled) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      });
      console.log("transform" + texts[0].transform);
      // Draw texts
      texts.forEach(
        ({ content, color, x, y, fontSize, fontStyle, transform }) => {
          ctx.save(); // Save the current state of the canvas

          // Apply transformations if any
          if (transform) {
            const transforms = transform.split(" ");
            transforms.forEach((t) => {
              if (t.startsWith("translateX")) {
                const value = t.match(/-?\d+(\.\d+)?/);
                if (value) {
                  ctx.translate(parseFloat(value[0]) * zoomLevel, 0);
                }
              }
              // Add more transformations as needed
            });
          }

          ctx.fillStyle = color;
          ctx.font = `${
            fontStyle === "Bold"
              ? "bold"
              : fontStyle === "Italic"
              ? "italic"
              : "normal"
          } ${(fontSize || 16) * zoomLevel}px Arial`;
          // Convert x from percentage to absolute value

          console.log("x" + x);
          console.log("y" + y);
          //if x= 50 then x=canvas.width/2, if x= 10 then x=canvas.width/10
          if (x < 100) {
            x = (canvas.width * x) / 100;
          }

          ctx.fillText(content, x, y);

          ctx.restore(); // Restore the canvas state
        }
      );
    };

    // Draw background image
    const bgImage = new Image();
    bgImage.crossOrigin = "anonymous"; // Enable CORS
    bgImage.src = image;
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      // renderShapesAndTexts(); // Render shapes and texts after the image

      // Draw logo in the top right corner
      const logoImage = new Image();
      logoImage.crossOrigin = "anonymous"; // Enable CORS
      logoImage.src = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(
        logo
      )}`; // Use proxy to bypass CORS
      logoImage.onload = () => {
        ctx.drawImage(
          logoImage,
          canvas.width - 100 * zoomLevel,
          10 * zoomLevel,
          90 * zoomLevel,
          90 * zoomLevel
        ); // Adjust logo size and position
      };
    };

    // If the background image is not ready, render shapes and texts on a blank canvas
    bgImage.onerror = renderShapesAndTexts;
  }, [image, shapes, texts, logo, canvasWidth, canvasHeight, zoomLevel]); // Ensure shapes, texts, and logo trigger re-render

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === "pointer") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoomLevel;
      const y = (e.clientY - rect.top) / zoomLevel;

      // Check if clicked on any shape
      const clickedShape = shapes.find(
        (shape) =>
          (shape.type === "circle" &&
            Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <=
              (shape.size || 30)) ||
          (shape.type === "rectangle" &&
            x >= shape.x - (shape.size || 30) &&
            x <= shape.x + (shape.size || 30) &&
            y >= shape.y - (shape.size || 30) &&
            y <= shape.y + (shape.size || 30)) ||
          (shape.type === "triangle" &&
            ctx.isPointInPath(
              new Path2D(
                `M${shape.x},${shape.y - (shape.size || 30)} L${
                  shape.x + (shape.size || 30)
                },${shape.y + (shape.size || 30)} L${
                  shape.x - (shape.size || 30)
                },${shape.y + (shape.size || 30)} Z`
              ),
              x,
              y
            )) ||
          (shape.type === "star" &&
            ctx.isPointInPath(
              new Path2D(
                `M${shape.x},${shape.y - (shape.size || 30)} L${
                  shape.x + (shape.size || 30)
                },${shape.y + (shape.size || 30)} L${
                  shape.x - (shape.size || 30)
                },${shape.y + (shape.size || 30)} Z`
              ),
              x,
              y
            )) ||
          (shape.type === "heart" &&
            ctx.isPointInPath(
              new Path2D(
                `M${shape.x},${shape.y} C${shape.x},${
                  shape.y - (shape.size || 30)
                } ${shape.x - (shape.size || 30)},${
                  shape.y - (shape.size || 30)
                } ${shape.x - (shape.size || 30)},${shape.y} C${
                  shape.x - (shape.size || 30)
                },${shape.y + (shape.size || 30)} ${shape.x},${
                  shape.y + (shape.size || 30)
                } ${shape.x},${shape.y + (shape.size || 30) * 2} C${shape.x},${
                  shape.y + (shape.size || 30)
                } ${shape.x + (shape.size || 30)},${
                  shape.y + (shape.size || 30)
                } ${shape.x + (shape.size || 30)},${shape.y} C${
                  shape.x + (shape.size || 30)
                },${shape.y - (shape.size || 30)} ${shape.x},${
                  shape.y - (shape.size || 30)
                } ${shape.x},${shape.y} Z`
              ),
              x,
              y
            ))
      );

      if (clickedShape) {
        setSelectedLayerState(clickedShape.id);
        setSelectedLayer(clickedShape.id);
        setIsDragging(true);
        return;
      }

      // Check if clicked on any text
      const clickedText = texts.find(
        (text) =>
          x >= text.x &&
          x <= text.x + text.content.length * 8 &&
          y >= text.y - 16 &&
          y <= text.y
      );

      if (clickedText) {
        setSelectedLayerState(clickedText.id);
        setSelectedLayer(clickedText.id);
        setIsDragging(true);
        return;
      }

      // If clicked on blank space
      setSelectedLayerState(null);
      setSelectedLayer(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === "pointer" && selectedLayer && isDragging) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoomLevel;
      const y = (e.clientY - rect.top) / zoomLevel;

      const selectedShape = shapes.find((shape) => shape.id === selectedLayer);
      const selectedText = texts.find((text) => text.id === selectedLayer);

      if (selectedShape) {
        setShapes(
          shapes.map((shape) =>
            shape.id === selectedLayer ? { ...shape, x, y } : shape
          )
        );
      } else if (selectedText) {
        setTexts(
          texts.map((text) =>
            text.id === selectedLayer ? { ...text, x, y } : text
          )
        );
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.imageEditor}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className={styles.canvas}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      ></canvas>
    </div>
  );
};

export default ImageEditor;
