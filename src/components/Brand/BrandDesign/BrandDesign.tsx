import React from "react";
import styles from "./BrandDesign.module.css";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useTranslation } from "react-i18next";

interface GenerateTextTemplateProps {
  LogoImage: string;
  selectedBGColor: string;
}

const BrandDesign: React.FC<GenerateTextTemplateProps> = ({
  LogoImage,
  selectedBGColor,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.parentDiv}>
      <div className={styles.templateBox}>
        <div
          className={styles.logoBox}
          style={{
            backgroundImage: `url(${LogoImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {LogoImage === "" && (
            <div className={styles.logoText}>
              {t("TemplateImage.logoText")}{" "}
              <div className={styles.subtext}>{t("TemplateImage.subtext")}</div>
            </div>
          )}
        </div>
        <div className={styles.templateInnerBox}>
          <div>
            <div className={styles.field1Text}>{t("TemplateImage.field1")}</div>
            <div className={styles.field2Text}>{t("TemplateImage.field2")}</div>
          </div>

          <div
            className={styles.innerBox}
            style={{
              backgroundColor: selectedBGColor,
            }}
          >
            {selectedBGColor === "" && (
              <div className={styles.placeholderContent}>
                <ImageOutlinedIcon
                  style={{
                    fontSize: 40,
                    transform: "scale(1.8)",
                    color: "white",
                  }}
                />
                <div className={styles.placeHolderText}>
                  {t("TemplateImage.placeholder")}
                </div>
              </div>
            )}
            <div className={styles.field3Text}>{t("TemplateImage.field3")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDesign;
