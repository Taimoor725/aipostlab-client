import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next"; // Import i18next for translations

const initializeGenerateTextFormFields = () => ({
  field1: i18n.t("TemplateImage.field1"),
  field2: i18n.t("TemplateImage.field2"),
  field3: i18n.t("TemplateImage.field3"),
});

const initialState = {
  selectedSize: "",
  GenerateTextFormFields: initializeGenerateTextFormFields(),
  imageString: "",
  socialProjectName: "", // Ensure this is where project name is stored
  brandId: "", // Add brandId to initial state
};

const SocialCreativeSlice = createSlice({
  name: "socialCreative",
  initialState,
  reducers: {
    selectSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    updateGenerateTextFormFields: (state, action) => {
      state.GenerateTextFormFields = {
        ...state.GenerateTextFormFields,
        ...action.payload,
      };
    },
    updateImageString: (state, action) => {
      state.imageString = action.payload;
    },
    updateSocialProjectName: (state, action) => {
      // Directly update the socialProjectName field
      state.socialProjectName = action.payload;
    },
    updateBrandId: (state, action) => {
      state.brandId = action.payload;
    },
  },
});

export const {
  selectSize,
  updateGenerateTextFormFields,
  updateImageString,
  updateSocialProjectName,
  updateBrandId,
} = SocialCreativeSlice.actions;

export default SocialCreativeSlice.reducer;
