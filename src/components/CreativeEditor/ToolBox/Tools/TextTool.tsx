import { useEffect, useState } from "react";
import { useTextStore, useLayerStore } from "../../../../store/ToolBoxStore";

const TextTool = () => {
  const { textLayers, setActiveState, setActiveStyle, activeStyle } = useTextStore();
  const { addTextLayer, activeLayer, setActiveLayer } = useLayerStore();

  const [fontSize, setFontSize] = useState(activeStyle.fontSize || 70);
  const [fontColor, setFontColor] = useState(activeStyle.color || "#000000");
  const [fontFamily, setFontFamily] = useState(activeStyle.fontFamily || "Default Font");
  const [fontWeight, setFontWeight] = useState(activeStyle.fontWeight || "Regular");
  const [textType, setTextType] = useState(activeStyle.text || "heading");

  const calculateStyles = (size: number) => {
    let calculatedHeight = 0;
    let calculatedWidth = 0;

    // Calculate dimensions based on font size
    if (textType === "heading") {
      calculatedHeight = size * 2;
      calculatedWidth = size * 4;
    } else if (textType === "subheading") {
      calculatedHeight = size * 2;
      calculatedWidth = size * 5.5;
    } else if (textType === "smallText") {
      calculatedHeight = size * 2.5;
      calculatedWidth = size * 5.5;
    }

    return { calculatedHeight, calculatedWidth };
  };

  const applyStyles = (type: string) => {
    const { calculatedHeight, calculatedWidth } = calculateStyles(fontSize);
    setTextType(type);
    setActiveState(true);

    setActiveStyle({
      type: type,
      fontSize: `${fontSize}px`,
      color: fontColor,
      fontFamily: fontFamily,
      fontWeight: fontWeight === "Regular" ? "normal" : "",
      text: type,
      width: `${calculatedWidth}px`,
      height: `${calculatedHeight}px`,
    });

    if (activeLayer) {
      setActiveLayer({
        ...activeLayer,
        fontSize,
        fontFamily,
        color: fontColor,
        fontWeight,
      });
    }
  };

  const handleAddText = () => {
    const { calculatedHeight, calculatedWidth } = calculateStyles(fontSize);

    const newLayer = {
      id: Date.now(),
      type: "text",
      text: textType,
      position: Math.floor(Math.random() * 1000),
      color: fontColor,
      fontSize,
      fontFamily,
      fontWeight: fontWeight === "Regular" ? "normal" : fontWeight.toLowerCase(),
      width: `${calculatedWidth}px`,
      height: `${calculatedHeight}px`,
    };

    addTextLayer(newLayer);
    setActiveLayer(newLayer);
    console.log(activeLayer);
    console.log(textLayers);
  };

  useEffect(() => {
    const { calculatedHeight, calculatedWidth } = calculateStyles(fontSize);
    setActiveStyle({
      ...activeStyle,
      fontSize: `${fontSize}px`,
      color: fontColor,
      fontFamily: fontFamily,
      fontWeight: fontWeight === "Regular" ? "normal" : "",
      width: `${calculatedWidth}px`,
      height: `${calculatedHeight}px`,
    });
  }, [fontSize, fontWeight, fontFamily, fontColor]);

  return (
    <div className="p-2 bg-white w-full rounded-lg shadow-md flex flex-col justify-between h-full">
      <h2 className="text-sm font-semibold mb-4 flex items-center">
        <span className="mr-2 text-xl">TT</span> Text Options
      </h2>
      <div className="space-y-3 flex-grow">
        <button
          className={`w-full p-2 bg-white border-gray-200 border-[2px] font-semibold rounded-md text-left flex justify-between ${
            textType === "heading" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => applyStyles("heading")}
        >
          Add a heading <span>70px</span>
        </button>
        <button
          className={`w-full p-2 bg-white border-gray-200 border-[2px] font-semibold rounded-md text-left flex justify-between ${
            textType === "subheading" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => applyStyles("subheading")}
        >
          Add a subheading <span>45px</span>
        </button>
        <button
          className={`w-full p-2 bg-white border-gray-200 border-[2px] font-semibold rounded-md text-left flex justify-between ${
            textType === "smallText" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => applyStyles("smallText")}
        >
          Add small text <span>20px</span>
        </button>

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
        >
          <option>Default Font</option>
          <option>Arial</option>
          <option>Helvetica</option>
          <option>Times New Roman</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Verdana</option>
        </select>

        <select
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
        >
          <option>Regular</option>
          <option>Bold</option>
          <option>Italic</option>
          <option>Light</option>
          <option>Medium</option>
        </select>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Font Size</label>
          <input
            type="range"
            min="10"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-grow"
          />
          <span>{fontSize}px</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-8 h-8 border rounded-md"
          />
          <span>{fontColor}</span>
        </div>
      </div>

      <button
        onClick={handleAddText}
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Add Text Layer
      </button>
    </div>
  );
};

export default TextTool;
