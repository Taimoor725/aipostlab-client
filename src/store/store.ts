import { configureStore } from "@reduxjs/toolkit";
import SocialCreativeSliceReducer from "../services/SocialCreativeSlice";
import brandReducer from "../services/brandSlice";
import productCreativeSliceReducer from "../services/ProductCreative";

const store = configureStore({
  reducer: {
    SocialCreativeSlice: SocialCreativeSliceReducer,
    brand: brandReducer,
    productCreativeSlice: productCreativeSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
