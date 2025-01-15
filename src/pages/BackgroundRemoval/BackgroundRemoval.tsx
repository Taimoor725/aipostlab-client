import React from "react";
import styles from "./BackgroundRemoval.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";
import ImageBox from "../../components/BackgroundRemoval/ImageBox/ImageBox";
import DescriptionBox from "../../components/BackgroundRemoval/DescriptionBox/DescriptionBox";
import ProjectName from "../../components/BackgroundRemoval/ProjectName/ProjectName";
import Button from "../../components/utils/Button/Button";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const BackgroundRemoval: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const image = useSelector(
    (state: RootState) => state.productCreativeSlice.image || ""
  );

  const handleNavigate = () => {
    if (!image) {
      setError(t("BackgroundRemoval.error"));
      return;
    }
    navigate("/ai-background-styles");
  };

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("ProductCreatives.title")}
        subtitle={t("ProductCreatives.subtitle")}
        Icon={RocketLaunchIcon}
      />

      <div className={styles.backgroundImageContainer}>
        <ImageBox imageSrc={image} />
        <DescriptionBox />
      </div>
      <div className={styles.backgroundImageContainer}>
        <ProjectName />
        <div className={styles.buttonWrapper}>
          <Button
            label="Next Step"
            onClick={handleNavigate}
            color="#9a32ef"
            size="large"
          />
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemoval;
