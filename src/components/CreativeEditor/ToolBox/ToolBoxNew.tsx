import React, { useState, useEffect, useRef } from 'react';
import PaletteToolMenu from './Tools/Palette';
import ToolTemplate from './Tools/Template';
import ShapeToolMenu from "../ToolBox/Tools/Shapes";
import LayerToolMenu from './Tools/LayersTool';
import TextTool from '../ToolBox/Tools/TextTool';
import { useTextStore, useLayerStore } from '../../../store/ToolBoxStore';

const Tool = ({
    imgSrc,
    title = "help message",
    onClick,
}: {
    imgSrc: string;
    title?: string;
    onClick: () => void;
}) => {
    return (
        <img
            width={"100px"}
            height={"100px"}
            src={imgSrc}
            alt={imgSrc}
            className="w-12 h-12 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors p-2"
            title={title}
            onClick={onClick}
        />
    );
};

const ToolBoxNew = () => {
    const { activetool } = useTextStore();
    const { layerstate } = useLayerStore();

    const [activeTool, setActiveTool] = useState<string | null>(null);
    const toolboxRef = useRef<HTMLDivElement>(null);
    const subToolboxRef = useRef<HTMLDivElement>(null);

    const handleToolClick = (tool: string) => {
        if (activeTool === tool) {
            setActiveTool(null);
        } else {
            setActiveTool(tool);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        const toolbox = toolboxRef.current;
        const subToolbox = subToolboxRef.current;

        // Prevent closing if clicked inside toolbox or subToolbox
        if (
            toolbox && toolbox.contains(e.target as Node) ||
            subToolbox && subToolbox.contains(e.target as Node)
        ) {
            return;
        }
        setActiveTool(null);
    };

    // Add event listener for clicks outside of the toolbox
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex gap-4 isolate transition-[height]">
            <div
                ref={toolboxRef}
                className="flex flex-col bg-gray-100 rounded-2xl py-6 gap-2 w-28 items-center justify-center z-10 transition-[height]"
            >
                <div className="font-bold text-lg text-gray-800">Tool Box</div>
                <Tool
                    imgSrc="/icons/mouse.svg"
                    title="Select Tool"
                    onClick={() => handleToolClick("mouse")}
                />
                <Tool
                    imgSrc="/icons/shapes.svg"
                    title="Shape Tool"
                    onClick={() => handleToolClick("shapes")}
                />
                <Tool
                    imgSrc="/icons/text.svg"
                    title="Text Tool"
                    onClick={() => handleToolClick("text")}
                />
                <Tool
                    imgSrc="/icons/layers.svg"
                    title="Layer Tool"
                    onClick={() => handleToolClick("layers")}
                />
                <Tool
                    imgSrc="/icons/palette.svg"
                    title="Color Palette"
                    onClick={() => handleToolClick("palette")}
                />
            </div>

            <div
                ref={subToolboxRef}
                className={`z-0 flex flex-col bg-gray-100 rounded-2xl py-6 gap-4 w-auto items-center justify-center ${
                    activeTool === null ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
                } transition-all`}
            >
                <ToolTemplate title={activeTool ?? ""}>
                    {activeTool === "shapes" && <ShapeToolMenu />}
                    {activeTool === "text" && <TextTool/>}
                    {activeTool === "layers" && <LayerToolMenu />}
                    {activeTool === "palette" && <PaletteToolMenu />}
                </ToolTemplate>
            </div>
        </div>
    );
};

export default ToolBoxNew;
