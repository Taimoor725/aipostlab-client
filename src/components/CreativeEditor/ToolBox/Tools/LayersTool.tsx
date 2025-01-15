import { useLayerStore } from "../../../../store/ToolBoxStore";

interface LayerProps {
    type: "text" | "shape";
    position: number;
    color: string;
};
const Layer = ({ type, position, color }: LayerProps) => {
    const iconSrc = type === "text" ? "/icons/shapes.svg" : "/icons/text.svg";
    return (
        <div className="flex px-4 py-2 gap-2 bg-gray-200 w-full rounded-xl items-center justify-between border-2 cursor-pointer" style={{ borderColor: color }}>
            <img width={"100px"} height={"100px"} alt={type} src={iconSrc} className="w-4 h-4" />
            <div className="text-sm">{type}-{position}</div>
        </div>
    )
}

const LayerToolMenu = () => {
    const { layers } = useLayerStore();
    return (
        <div className="flex flex-col gap-2">
            {
                layers.map((layer: LayerProps, index: number) => (
                    <Layer {...layer} key={index} />
                ))
            }
        </div>
    )
};

export default LayerToolMenu;
