import React from "react";
import styles from "./TextOnImage.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SizeBox from "../../components/SizeBox/SizeBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import GenerateText from "../../components/GenerateText/GenerateText";
import Button from "../../components/utils/Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TextOnImage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectedSize = useSelector(
    (state: RootState) => state.SocialCreativeSlice.selectedSize
  );
  console.log("selected size ", selectedSize);

  const handleNavigate = () => {
    if (selectedSize) {
      navigate("/background-image");
    }
  };

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("TextOnImage.title")}
        subtitle={t("TextOnImage.subtitle")}
        Icon={RocketLaunchIcon}
      />
      <GenerateText />
      <div className={styles.buttonWrapper}>
        <Button
          label={t("TextOnImage.nextStep")}
          onClick={handleNavigate}
          color="#9a32ef"
          size="medium"
        />
      </div>
    </div>
  );
};
export default TextOnImage;
