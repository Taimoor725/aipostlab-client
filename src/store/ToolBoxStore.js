import { create } from "zustand";

const MAX_RECENT_COLORS = 5;

export const useToolboxStore = create((set) => ({
  activeTool: null,
  setActiveTool: (tool) => set({ activeTool: tool }),
  recentColors: [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F1C40F", // Yellow
    "#9B59B6", // Purple
  ],
  colorSwatches: [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6",
    "#1ABC9C", "#E74C3C", "#34495E", "#2ECC71", "#8E44AD",
    "#F39C12", "#D35400", "#7F8C8D", "#BDC3C7", "#2980B9",
    "#16A085", "#E67E22", "#F4A300", "#C0392B",
  ],
  activeColor: "#EFEFEF",
  setActiveColor: (color) => set({ activeColor: color }),
  addRecentColor: (color) => set((state) => {
    const updatedRecentColors = [color, ...state.recentColors.filter((c) => c !== color)].slice(0, MAX_RECENT_COLORS);
    return { recentColors: updatedRecentColors };
  }),
  addCustomColor: (color) => set((state) => ({
    colorSwatches: [...state.colorSwatches, color],
  })),
}));

export const useShapesStore = create((set) => ({
  shapes: ["circle", "triangle", "square"],
  activeProperties: {
    height: 100,
    width: 100,
    shape: "",
    color: "#000000",
    type: "",
  },
  activeShape: "",
  setActiveShape: (shape) => set({ activeShape: shape }),
  setActiveProperties: (properties) =>
    set((state) => ({
      activeProperties: { ...state.activeProperties, ...properties },
    })),
}));

export const useTextStore = create((set) => ({
  activeText: "",
  activeStyle: {
    font: "serif",
    weight: "normal",
    color: "black",
    fontSize: 45,
  },
  activeState: null,
  setActiveState: (state) => set({ activeState: state }),
  setActiveText: (text) => set({ activeText: text }),
  setActiveStyle: (style) => set({ activeStyle: style }),
  resetTextTool: () => set({
    activeState: null,
    activeText: "",
    activeStyle: { font: "serif", weight: "normal", color: "black", fontSize: 45 },
  }),
  // textLayers: [],
  // addTextLayer: (textLayer) => set((state) => ({
  //   textLayers: [...state.textLayers, textLayer],
  // })),
}));

export const useLayerStore = create((set) => ({
  layers: [],
  activeLayer: null,
  layerstate: null,
  removeLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((layer) => layer.id !== id),
      activeLayer: state.activeLayer?.id === id ? null : state.activeLayer,
    })),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setLayerState: (state) => set({ layerstate: state }),
  addShapeLayer: (shapeLayer) =>
    set((state) => ({
      layers: [
        ...state.layers,
        { id: Date.now(), type: "shape", ...shapeLayer },
      ],
    })),
  addTextLayer: (textLayer) =>
    set((state) => ({
      layers: [
        ...state.layers,
        { id: Date.now(), type: "text", ...textLayer },
      ],
    })),
  updateLayerStyle: (id, updatedStyle) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, ...updatedStyle } : layer
      ),
    })),
}));

export default useToolboxStore;
