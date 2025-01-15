import React, { useState } from "react";
import styles from "./ToolBox.module.css";
import { Shape, Text } from "../../../pages/CreativeEditor/CreativeEditor";
import {
  FaMousePointer,
  FaShapes,
  FaTextHeight,
  FaLayerGroup,
  FaFont,
  FaCircle,
  FaSquare,
  FaStar,
  FaHeart,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

interface ToolBoxProps {
  setImage: (image: string) => void;
  addShape: (shape: Shape) => void;
  addText: (text: Text) => void;
  setActiveTool: (tool: "pointer" | "shapes" | "text") => void;
  shapes: Shape[];
  texts: Text[];
  selectedLayer: string | null;
  setSelectedLayer: (id: string | null) => void;
  updateShape: (id: string, updatedProps: Partial<Shape>) => void;
  updateText: (id: string, updatedProps: Partial<Text>) => void;
  deleteShape: (id: string) => void;
  deleteText: (id: string) => void;
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>; // Add setShapes prop
  setTexts: React.Dispatch<React.SetStateAction<Text[]>>; // Add setTexts prop
}

const ToolBox: React.FC<ToolBoxProps> = ({
  setImage,
  addShape,
  addText,
  setActiveTool,
  shapes,
  texts,
  selectedLayer,
  setSelectedLayer,
  updateShape,
  updateText,
  deleteShape,
  deleteText,
  setShapes, // Add setShapes prop
  setTexts, // Add setTexts prop
}) => {
  const [showShapesModal, setShowShapesModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showEditTextModal, setShowEditTextModal] = useState(false); // Separate modal for editing text
  const [showEditShapeModal, setShowEditShapeModal] = useState(false); // Separate modal for editing shapes
  const [showLayersModal, setShowLayersModal] = useState(false);
  const [shapeOptions, setShapeOptions] = useState({
    color: "black",
    filled: true,
    size: 30, // Add size option
  });
  const [textOptions, setTextOptions] = useState({
    content: "",
    fontStyle: "Regular" as "Regular" | "Bold" | "Italic",
    fontSize: 16,
    color: "black",
    font: "Arial",
  });

  const handleLayerSelect = (id: string) => setSelectedLayer(id);

  const handleLayerEdit = () => {
    const selectedShape = shapes.find((shape) => shape.id === selectedLayer);
    const selectedText = texts.find((text) => text.id === selectedLayer);

    if (selectedShape) {
      setShapeOptions({
        color: selectedShape.color,
        filled: selectedShape.filled,
        size: selectedShape.size || 30, // Set size option
      });
      setShowEditShapeModal(true); // Open edit shape modal
    } else if (selectedText) {
      setTextOptions({
        content: selectedText.content,
        fontStyle: selectedText.fontStyle || "Regular",
        fontSize: selectedText.fontSize || 16,
        color: selectedText.color,
        font: selectedText.font || "Arial",
      });
      setShowEditTextModal(true); // Open edit text modal
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTextOptions((prev) => ({
      ...prev,
      [name]:
        name === "fontStyle" ? (value as "Regular" | "Bold" | "Italic") : value,
    }));
  };

  const handleShapeOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setShapeOptions((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const moveLayerUp = (id: string) => {
    const allLayers = [...shapes, ...texts];
    const index = allLayers.findIndex((layer) => layer.id === id);
    if (index > 0) {
      const newLayers = [...allLayers];
      [newLayers[index - 1], newLayers[index]] = [
        newLayers[index],
        newLayers[index - 1],
      ];
      setShapes(newLayers.filter((layer) => "type" in layer) as Shape[]);
      setTexts(newLayers.filter((layer) => !("type" in layer)) as Text[]);
    }
  };

  const moveLayerDown = (id: string) => {
    const allLayers = [...shapes, ...texts];
    const index = allLayers.findIndex((layer) => layer.id === id);
    if (index < allLayers.length - 1) {
      const newLayers = [...allLayers];
      [newLayers[index + 1], newLayers[index]] = [
        newLayers[index],
        newLayers[index + 1],
      ];
      setShapes(newLayers.filter((layer) => "type" in layer) as Shape[]);
      setTexts(newLayers.filter((layer) => !("type" in layer)) as Text[]);
    }
  };

  return (
    <div className={styles.toolBoxWrapper}>
      <div className={styles.toolBox}>
        <div className={styles.toolBoxTitle}>Tool Box</div>
        <div
          className={styles.toolBoxItem}
          onClick={() => setActiveTool("pointer")}
        >
          <FaMousePointer />
        </div>
        <div
          className={styles.toolBoxItem}
          onClick={() => {
            setShowShapesModal(!showShapesModal);
            setShowLayersModal(false);
            setShowTextModal(false);
            setShowEditShapeModal(false);
            setShowEditTextModal(false);
          }}
        >
          <FaShapes />
        </div>

        <div
          className={styles.toolBoxItem}
          onClick={() => {
            setShowTextModal(!showTextModal);
            setShowShapesModal(false);
            setShowLayersModal(false);
            setShowEditShapeModal(false);
            setShowEditTextModal(false);
          }}
        >
          <FaTextHeight />
        </div>

        <div
          className={styles.toolBoxItem}
          onClick={() => {
            setShowLayersModal(!showLayersModal);
            setShowTextModal(false);
            setShowShapesModal(false);
            setShowEditShapeModal(false);
            setShowEditTextModal(false);
          }}
        >
          <FaLayerGroup />
        </div>

        {/*selectedLayer && (
          <button className={styles.editButton} onClick={handleLayerEdit}>
            Edit Selected Layer
          </button>
        )*/}
      </div>
      <div className={styles.modalWrapper}>
        {showShapesModal && (
          <div className={styles.shapesModal}>
            <div className={styles.shapeOptions}>
              <label>Color:</label>
              <input
                type="color"
                name="color"
                value={shapeOptions.color}
                onChange={handleShapeOptionChange}
                className={styles.colorInput}
              />
              <label>
                <input
                  type="checkbox"
                  name="filled"
                  checked={shapeOptions.filled}
                  onChange={handleShapeOptionChange}
                />
                Filled
              </label>
              <label>Size:</label>
              <input
                type="number"
                name="size"
                value={shapeOptions.size}
                onChange={handleShapeOptionChange}
                className={styles.sizeInput}
              />
            </div>
            <div className={styles.shapeList}>
              <div
                className={styles.shapeItem}
                onClick={() => {
                  addShape({
                    id: Date.now().toString(),
                    type: "circle",
                    color: shapeOptions.color,
                    x: 50,
                    y: 50,
                    filled: shapeOptions.filled,
                    size: shapeOptions.size,
                  });
                  setActiveTool("shapes");
                }}
              >
                <FaCircle /> Circle
              </div>
              <div
                className={styles.shapeItem}
                onClick={() => {
                  addShape({
                    id: Date.now().toString(),
                    type: "rectangle",
                    color: shapeOptions.color,
                    x: 50,
                    y: 50,
                    filled: shapeOptions.filled,
                    size: shapeOptions.size,
                  });
                  setActiveTool("shapes");
                }}
              >
                <FaSquare /> Rectangle
              </div>
              <div
                className={styles.shapeItem}
                onClick={() => {
                  addShape({
                    id: Date.now().toString(),
                    type: "star",
                    color: shapeOptions.color,
                    x: 50,
                    y: 50,
                    filled: shapeOptions.filled,
                    size: shapeOptions.size,
                  });
                  setActiveTool("shapes");
                }}
              >
                <FaStar /> Star
              </div>
              <div
                className={styles.shapeItem}
                onClick={() => {
                  addShape({
                    id: Date.now().toString(),
                    type: "heart",
                    color: shapeOptions.color,
                    x: 50,
                    y: 50,
                    filled: shapeOptions.filled,
                    size: shapeOptions.size,
                  });
                  setActiveTool("shapes");
                }}
              >
                <FaHeart /> Heart
              </div>
            </div>
          </div>
        )}

        {showTextModal && (
          <div className={styles.textModal}>
            <div className={styles.textModalTitle}>
              <FaFont /> Text Options
            </div>
            <hr className={styles.divider} />
            <div className={styles.textContainer}>
              <input
                type="text"
                name="content"
                placeholder="Enter text"
                value={textOptions.content}
                onChange={handleTextChange}
                className={styles.textInput}
              />
            </div>
            {/*select fonts*/}
            <select
              name="font"
              value={textOptions.font}
              onChange={handleTextChange}
              className={styles.selectFont}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            <select
              name="fontStyle"
              value={textOptions.fontStyle}
              onChange={handleTextChange}
              className={styles.selectFontStyle}
            >
              <option value="Regular">Regular</option>
              <option value="Bold">Bold</option>
              <option value="Italic">Italic</option>
            </select>
            <div className={styles.fontSizeContainer}>
              <input
                type="number"
                name="fontSize"
                placeholder="Font size"
                value={textOptions.fontSize}
                onChange={handleTextChange}
                className={styles.fontInput}
              />
            </div>
            <label className={styles.colorLabel}>Color:</label>
            <input
              type="color"
              name="color"
              value={textOptions.color}
              onChange={handleTextChange}
              className={styles.colorInput}
            />
            <button
              onClick={() => {
                addText({
                  id: Date.now().toString(),
                  content: textOptions.content,
                  color: textOptions.color,
                  x: 50,
                  y: 50,
                  fontSize: textOptions.fontSize,
                  fontStyle: textOptions.fontStyle,
                  font: textOptions.font,
                });
                setShowTextModal(false);
                setActiveTool("text");
              }}
            >
              Apply
            </button>
          </div>
        )}

        {showEditTextModal && (
          <div className={styles.textModal}>
            <div className={styles.textModalTitle}>
              <FaFont /> Edit Text Options
            </div>
            <hr className={styles.divider} />
            <div className={styles.textContainer}>
              <input
                type="text"
                name="content"
                placeholder="Enter text"
                value={textOptions.content}
                onChange={handleTextChange}
                className={styles.textInput}
              />
            </div>
            {/*select fonts*/}
            <select
              name="font"
              value={textOptions.font}
              onChange={handleTextChange}
              className={styles.selectFont}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            <select
              name="fontStyle"
              value={textOptions.fontStyle}
              onChange={handleTextChange}
              className={styles.selectFontStyle}
            >
              <option value="Regular">Regular</option>
              <option value="Bold">Bold</option>
              <option value="Italic">Italic</option>
            </select>
            <div className={styles.fontSizeContainer}>
              <input
                type="number"
                name="fontSize"
                placeholder="Font size"
                value={textOptions.fontSize}
                onChange={handleTextChange}
                className={styles.fontInput}
              />
            </div>
            <label className={styles.colorLabel}>Color:</label>
            <input
              type="color"
              name="color"
              value={textOptions.color}
              onChange={handleTextChange}
              className={styles.colorInput}
            />
            <button
              onClick={() => {
                if (selectedLayer) {
                  updateText(selectedLayer, {
                    content: textOptions.content,
                    color: textOptions.color,
                    fontSize: textOptions.fontSize,
                    fontStyle: textOptions.fontStyle,
                    font: textOptions.font,
                  });
                }
                setShowEditTextModal(false);
                setActiveTool("text");
              }}
            >
              Apply
            </button>
          </div>
        )}

        {showEditShapeModal && (
          <div className={styles.shapeModal}>
            <div className={styles.shapeModalTitle}>
              <FaShapes /> Edit Shape Options
            </div>
            <hr className={styles.divider} />
            <div className={styles.shapeOptions}>
              <label>Color:</label>
              <input
                type="color"
                name="color"
                value={shapeOptions.color}
                onChange={handleShapeOptionChange}
                className={styles.colorInput}
              />
              <label>
                <input
                  type="checkbox"
                  name="filled"
                  checked={shapeOptions.filled}
                  onChange={handleShapeOptionChange}
                />
                Filled
              </label>
              <label>Size:</label>
              <input
                type="number"
                name="size"
                value={shapeOptions.size}
                onChange={handleShapeOptionChange}
                className={styles.sizeInput}
              />
            </div>
            <button
              onClick={() => {
                if (selectedLayer) {
                  updateShape(selectedLayer, {
                    color: shapeOptions.color,
                    filled: shapeOptions.filled,
                    size: shapeOptions.size,
                  });
                }
                setShowEditShapeModal(false);
                setActiveTool("shapes");
              }}
            >
              Apply
            </button>
          </div>
        )}

        {showLayersModal && (
          <div className={styles.layersModal}>
            {[...shapes, ...texts].map((layer, index) => (
              <div
                key={layer.id}
                className={`${styles.layerItem} ${
                  selectedLayer === layer.id ? styles.activeLayer : ""
                }`}
              >
                <div onClick={() => handleLayerSelect(layer.id)}>
                  {"type" in layer
                    ? `Shape: ${layer.type} (${layer.color})`
                    : `Text: ${layer.content}`}
                </div>
                <div className={styles.layerActions}>
                  <FaArrowUp onClick={() => moveLayerUp(layer.id)} />
                  <FaArrowDown onClick={() => moveLayerDown(layer.id)} />
                  <FaEdit
                    onClick={() => {
                      setSelectedLayer(layer.id);
                      if ("type" in layer) {
                        setShapeOptions({
                          color: layer.color,
                          filled: layer.filled,
                          size: layer.size || 30,
                        });
                        setShowEditShapeModal(true); // Open edit shape modal
                      } else {
                        setTextOptions({
                          content: layer.content,
                          fontStyle: layer.fontStyle || "Regular",
                          fontSize: layer.fontSize || 16,
                          color: layer.color,
                          font: layer.font || "Arial",
                        });
                        setShowEditTextModal(true); // Open edit text modal
                      }
                    }}
                  />
                  <FaTrash
                    onClick={() => {
                      if ("type" in layer) {
                        deleteShape(layer.id);
                      } else {
                        deleteText(layer.id);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolBox;
