import React, { useState, useEffect } from "react";
import { useLayerStore, useTextStore } from "../../../../store/ToolBoxStore";

function TextElement({ layer }) {
  const { activeLayer, setActiveLayer, setLayerState, removeLayer } = useLayerStore();
  const [isFocused, setIsFocused] = useState(false);
  const { activeStyle } = useTextStore();
  const [opacity, setOpacity] = useState(1);

  const Style = {
    fontSize: layer.fontSize,
    color: layer.color,
    fontFamily: layer.fontFamily,
    fontWeight: layer.fontWeight,
    text: layer.text,
    width: layer.width,
    height: layer.height,
  };

  const isActive = activeLayer?.id === layer.id;

  const handleClick = () => {
    if (isActive) {
      setActiveLayer(null); 
    } else {
      setActiveLayer(layer); 
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeLayer(layer.id); 
  };

  useEffect(() => {
    if (activeLayer?.id === layer.id) {
      layer.fontSize = activeStyle.fontSize;
      layer.color = activeStyle.color;
      layer.fontFamily = activeStyle.fontFamily;
      layer.fontWeight = activeStyle.fontWeight;
      layer.text = activeStyle.text;
      layer.width = activeStyle.width;
      layer.height = activeStyle.height;
    }
  }, [activeStyle, layer, activeLayer]);

  return (
    <div
      className={`relative w-[${Style.width}] h-[${Style.height}] flex items-center justify-center ${
        isActive ? "border-2 border-green-500" : "border-none border-transparent"
      }`}
      style={{ opacity }}
      onClick={handleClick}
    >
      <textarea
        style={{
          ...Style,
        }}
        placeholder={Style.text}
        className="bg-transparent overflow-hidden text-center focus:outline-none w-full h-full border-none"
      />
      {isActive && (
        <button
          onClick={handleRemove}
          className="absolute top-[-5%] right-[-5%] w-6 h-6 flex justify-center items-center bg-red-500 text-white rounded-full"
        >
          X
        </button>
      )}
    </div>
  );
}

export default TextElement;
