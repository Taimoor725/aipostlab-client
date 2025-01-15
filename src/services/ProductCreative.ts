import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Style {
  id: number;
  base64Image: string;
}

interface ProductCreativeState {
  image: string | null;
  projectName: string;
  selectedStyles: Style[];
}

const initialState: ProductCreativeState = {
  image: null,
  projectName: "",
  selectedStyles: [],
};

const productCreativeSlice = createSlice({
  name: "productCreative",
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setProjectName(state, action: PayloadAction<string>) {
      state.projectName = action.payload;
    },
    setSelectedStyles(state, action: PayloadAction<Style[]>) {
      state.selectedStyles = action.payload;
    },
    clearSelectedStyles(state) {
      state.selectedStyles = [];
    },
    clearImage(state) {
      state.image = null;
    },
    clearProjectName(state) {
      state.projectName = "";
    },
  },
});

export const {
  setImage,
  setProjectName,
  setSelectedStyles,
  clearSelectedStyles,
  clearImage,
  clearProjectName,
} = productCreativeSlice.actions;
export default productCreativeSlice.reducer;
