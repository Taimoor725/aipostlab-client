import React from "react";
import styles from "./TemplateImage.module.css";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store/store";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useTranslation } from "react-i18next";

const TemplateImage: React.FC = () => {
  //when change the bg image then re render

  /*const updateGenerateTextFormFieldsData = {
    field1: "Your main headline here!",
    field2: "Your punchline is here!",
    field3: "Call to action text here!",
  };*/
  const selectedBGImage =
    useSelector((store: RootState) => store.SocialCreativeSlice.imageString) ||
    "";
  const LogoImage =
    useSelector((store: RootState) => store.brand.brandLogoUrl) || "";

  const updateGenerateTextFormFieldsData = useSelector(
    (store: RootState) => store.SocialCreativeSlice.GenerateTextFormFields
  );

  const { t } = useTranslation();

  return (
    <div className={styles.templateBox}>
      <div
        className={styles.logoBox}
        style={{
          backgroundImage: `url(${LogoImage})`,
          backgroundSize: "contain", // Changed from "cover" to "contain"
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
          <div className={styles.field1Text}>
            {updateGenerateTextFormFieldsData["field1"]
              ? updateGenerateTextFormFieldsData["field1"]
              : t("TemplateImage.field1")}
          </div>
          <div className={styles.field2Text}>
            {updateGenerateTextFormFieldsData["field2"]
              ? updateGenerateTextFormFieldsData["field2"]
              : t("TemplateImage.field2")}
          </div>
        </div>

        <div
          className={styles.innerBox}
          style={{
            backgroundImage: `url(${selectedBGImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {selectedBGImage === "" && (
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
          <div className={styles.field3Text}>
            {updateGenerateTextFormFieldsData["field3"]
              ? updateGenerateTextFormFieldsData["field3"]
              : t("TemplateImage.field3")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateImage;
