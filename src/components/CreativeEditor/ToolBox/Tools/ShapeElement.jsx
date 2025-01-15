import React from "react";
import { useLayerStore } from "../../../../store/ToolBoxStore";

const ShapeElement = ({ layer }) => {
  const { setActiveLayer, activeLayer, removeLayer } = useLayerStore(); // Assuming removeLayer function is implemented

  const isActive = activeLayer?.id === layer.id;
  const shapeStyle = {
    backgroundColor: layer.color,
    width: layer.width,
    height: layer.height,
    borderRadius: layer.shape === "circle" ? "50%" : "0",
  };

  const handleClick = () => {
    if (isActive) {
      setActiveLayer(null); // Deselect the layer if it's already selected
    } else {
      setActiveLayer(layer); // Select the layer
    }
  };

  return (
    <div
      className={`relative w-[${shapeStyle.width*2}] h-[${shapeStyle.height*2}] ${isActive ? "border-4 border-green-500" : ""}`}
      style={shapeStyle}
      onClick={handleClick}
    >
      {isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeLayer(layer.id); 
          }}
          className="absolute top-[-5%] right-[-5%] w-6 h-6 flex justify-center items-center bg-red-500 text-white rounded-full"
        >
          X
        </button>
      )}
    </div>
  );
};

export default ShapeElement;
