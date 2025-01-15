import { useEffect, useRef, useState } from "react";
import useToolboxStore, { useLayerStore, useShapesStore, useTextStore } from "../../../store/ToolBoxStore";
import TextElement from "../ToolBox/Tools/TextElement";
import Draggable from "react-draggable"; 
import ShapeElement from "../ToolBox/Tools/ShapeElement";

const ImageEditorNew = () => {
  const { activeColor } = useToolboxStore();
  const { activeShape } = useShapesStore();
  const { layers } = useLayerStore();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {  activeState } = useTextStore();



  return (
    <div className="w-[400px] h-[400px] rounded absolute bg-[#EFEFEF] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 parent overflow-hidden">
      {layers.map((layer: any, index: number) => {
        if (layer.type === "text" && activeState) {
          return (
            <Draggable
              key={index}
              bounds={{ top: -200, left: -200, right: 500, bottom: 500 }}
              defaultPosition={{ x: layer.x || 0, y: layer.y || 0 }}
            >
              <div
                className="child w-auto h-auto"
                style={{
                  cursor: "move",
                  position: "absolute",
                  top: `${layer.y}px`,
                  left: `${layer.x}px`,
                }}
              >
                <TextElement layer={layer} />
              </div>
            </Draggable>
          );
        }

        if (layer.type === "shape" && activeShape) {
          return (
            <Draggable
              key={index}
              bounds={{ top: -200, left: -200, right: 500, bottom: 500 }}
              defaultPosition={{ x: layer.x || 0, y: layer.y || 0 }}
            >
              <div
                className="child w-auto h-auto"
                style={{
                  cursor: "move",
                  position: "absolute",
                  top: `${layer.y}px`,
                  left: `${layer.x}px`,
                }}
              >
                <ShapeElement layer={layer} />
              </div>
            </Draggable>
          );
        }
      })}
    </div>
  );
};

export default ImageEditorNew;
