import React from "react";
import styles from "./SocialCreatives.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SizeBox from "../../components/SizeBox/SizeBox";
import Button from "../../components/utils/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const SocialCreative: React.FC = () => {
  const navigate = useNavigate();
  const selectedSize = useSelector(
    (state: RootState) => state.SocialCreativeSlice.selectedSize
  );
  const { t } = useTranslation();
  const handleNavigate = () => {
    if (selectedSize) {
      navigate("/text-on-image");
    }
  };
  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("SocialCreatives.title")}
        subtitle={t("SocialCreatives.subtitle")}
        Icon={RocketLaunchIcon}
      />
      <SizeBox />

      <div className={styles.buttonWrapper}>
        <Button
          label={t("SocialCreatives.nextStep")}
          onClick={handleNavigate}
          color="#9a32ef"
          size="medium"
        />
      </div>
    </div>
  );
};

export default SocialCreative;
