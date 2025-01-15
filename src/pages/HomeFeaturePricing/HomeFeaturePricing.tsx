import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./HomeFeaturePricing.module.css";
import Home from "../Home/Home";
import Features from "../Features/Features";
import Pricing from "../Pricing/Pricing";

const HomeBrandFeature: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <div id="home">
        <Home />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
    </div>
  );
};

export default HomeBrandFeature;
