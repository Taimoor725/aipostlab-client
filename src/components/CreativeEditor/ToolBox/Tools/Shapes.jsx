import React, { useState } from "react";
import { useShapesStore, useLayerStore } from "../../../../store/ToolBoxStore";

const ShapeToolMenu = () => {
  const { shapes, activeShape, setActiveShape } = useShapesStore();
  const { addShapeLayer, activeLayer, updateLayerStyle, setActiveLayer } =
    useLayerStore();

  const [color, setColor] = useState("#000000");
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  const handleChange = (property, value) => {
    if (activeLayer) updateLayerStyle(activeLayer.id, { [property]: value });
    if (property === "color") setColor(value);
    else if (property === "height") setHeight(value);
    else if (property === "width") setWidth(value);
  };

  const handleShapeSelection = (shape) => setActiveShape(shape);

  const handleAddShapeLayer = () => {
    if (!activeShape) {
      alert("Please select a shape before adding.");
      return;
    }

    const newLayer = {
      id: Date.now(),
      type: "shape",
      shape: activeShape,
      height,
      width,
      color,
    };

    addShapeLayer(newLayer);
    setActiveLayer(newLayer);
  };

  return (
    <div
      className="p-4 bg-white w-full rounded-lg shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold mb-4">Shape Options</h2>

      {/* Color Input */}
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="shape-color" className="text-sm">
          Color:
        </label>
        <input
          id="shape-color"
          type="color"
          value={activeLayer?.color || color}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-10 h-10 border rounded-md"
        />
      </div>

      {/* Height Input */}
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="shape-height" className="text-sm">
          Height:
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => handleChange("height", +e.target.value)}
          className="w-full border rounded-md p-1 outline-none"
        />
        <span className="text-sm outline-none border-1 border-gray-500">{activeLayer?.height || height}px</span>
      </div>

      {/* Width Input */}
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="shape-width" className="text-sm">
          Width:
        </label>
        <input
          type="number"
          value={width}
          onChange={(e) => handleChange("width", +e.target.value)}
          className="w-full border rounded-md p-1 outline-none"
        />
        <span className="text-sm ">{activeLayer?.width || width}px</span>
      </div>

      {/* Shape Selection */}
      <div className="flex flex-col gap-4">
        {shapes.map((shapeOption, index) => (
          <button
            key={index}
            className={`flex items-center justify-start w-full gap-2 p-2 rounded-lg text-black ${
              activeShape === shapeOption ? "bg-gray-300" : "bg-gray-200"
            } hover:bg-gray-300 transition-colors`}
            onClick={() => handleShapeSelection(shapeOption)}
          >
            <img
              width="24"
              height="24"
              alt={shapeOption}
              src={`/icons/shapes/${shapeOption}.svg`}
              className="w-6 h-6"
            />
            <span>{shapeOption}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleAddShapeLayer}
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Add Shape Layer
      </button>
    </div>
  );
};

export default ShapeToolMenu;
