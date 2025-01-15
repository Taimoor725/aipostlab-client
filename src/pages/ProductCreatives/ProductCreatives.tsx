import React from "react";
import styles from "./ProductCreatives.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SizeBox from "../../components/SizeBox/SizeBox";
import Button from "../../components/utils/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const ProductCreative: React.FC = () => {
  const navigate = useNavigate();
  const selectedSize = useSelector(
    (state: RootState) => state.SocialCreativeSlice.selectedSize
  );
  const { t } = useTranslation();
  const handleNavigate = () => {
    if (selectedSize) {
      navigate("/background-removal");
    }
  };
  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("ProductCreatives.title")}
        subtitle={t("ProductCreatives.subtitle")}
        Icon={RocketLaunchIcon}
      />
      <SizeBox />

      <div className={styles.buttonWrapper}>
        <Button
          label={t("ProductCreatives.nextStep")}
          onClick={handleNavigate}
          color="#9a32ef"
          size="medium"
        />
      </div>
    </div>
  );
};

export default ProductCreative;
