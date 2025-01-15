import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandState {
  selectedBrand: string | null;
  brandLogoUrl: string | null;
}

const initialState: BrandState = {
  selectedBrand: null,
  brandLogoUrl: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setSelectedBrand(state, action: PayloadAction<string>) {
      state.selectedBrand = action.payload;
    },
    setBrandLogoUrl(state, action: PayloadAction<string>) {
      state.brandLogoUrl = action.payload;
    },
  },
});

export const { setSelectedBrand, setBrandLogoUrl } = brandSlice.actions;
export default brandSlice.reducer;
