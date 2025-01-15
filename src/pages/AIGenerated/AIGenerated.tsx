import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AIGenerated.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ProjectBox from "../../components/utils/ProjectBox/ProjectBox";
import ShareIcon from "@mui/icons-material/Share";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import LinkedCameraOutlinedIcon from "@mui/icons-material/LinkedCameraOutlined";

const AIGenerated: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("AIGenerated.title")}
        subtitle={t("AIGenerated.subtitle")}
        Icon={AddCommentOutlinedIcon}
      />
      <div className={styles.selectionGrid}>
        <ProjectBox
          title={t("AIGenerated.socialCreatives.title")}
          description={t("AIGenerated.socialCreatives.description")}
          Icon={ShareIcon}
          alignLeft={true}
          navigateDir="/social-creatives"
        />

        <ProjectBox
          title={t("AIGenerated.productCreatives.title")}
          description={t("AIGenerated.productCreatives.description")}
          Icon={LinkedCameraOutlinedIcon}
          alignLeft={true}
          navigateDir="/product-creatives"
        />
      </div>
    </div>
  );
};

export default AIGenerated;
