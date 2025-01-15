import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Features.module.css";
import Title from "../../components/utils/Title/Title";
import { Button } from "@mui/material";
import AIAssets from "../../components/Home/AIAssets/AIAssets";
import ShareIcon from "@mui/icons-material/Share";
import ProjectBoxColor from "../../components/utils/ProjectBox/ProjectBoxColor";
import LinkedCameraOutlinedIcon from "@mui/icons-material/LinkedCameraOutlined";

const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <Title title={t("Features.title")} subTitle1={t("Features.subTitle1")} />
      <div className={styles.selectionGrid}>
        <ProjectBoxColor
          title={t("Features.socialCreatives.title")}
          description={t("Features.socialCreatives.description")}
          Icon={ShareIcon}
          alignLeft={true}
          navigateDir="/social-creatives"
        />
        <ProjectBoxColor
          title={t("Features.productCreatives.title")}
          description={t("Features.productCreatives.description")}
          Icon={LinkedCameraOutlinedIcon}
          alignLeft={true}
          navigateDir="/product-creatives"
        />
      </div>
    </div>
  );
};

export default Features;
