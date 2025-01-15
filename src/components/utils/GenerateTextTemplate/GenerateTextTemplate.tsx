import React from "react";
import styles from "./GenerateTextTemplate.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useTranslation } from "react-i18next";

const sizeList = [
  {
    title: "SizeBox.postSize",
    description: "1080 x 1080",
    Icon: InstagramIcon,
  },
  {
    title: "SizeBox.landscapeSize",
    description: "1200 x 628",
    Icon: LinkedInIcon,
  },
  {
    title: "SizeBox.storySize",
    description: "1080 x 1920",
    Icon: FacebookIcon,
  },
  {
    title: "SizeBox.pinSize",
    description: "1000 x 1500",
    Icon: PinterestIcon,
  },
];

const GenerateTextTemplate: React.FC = () => {
  const { t } = useTranslation();
  const updateGenerateTextFormFieldsData = useSelector(
    (store: RootState) => store.SocialCreativeSlice.GenerateTextFormFields
  );
  const selectedBGImage = useSelector(
    (store: RootState) => store.SocialCreativeSlice.imageString
  );
  const selectedSize = useSelector(
    (state: RootState) => state.SocialCreativeSlice.selectedSize
  );
  const LogoImage =
    useSelector((store: RootState) => store.brand.brandLogoUrl) || "";

  // const selectedSize="Post Size"
  // console.log('updateGenerateTextFormFieldsData ', updateGenerateTextFormFieldsData)

  return (
    <div className={styles.parentDiv}>
      <div className={styles.sizeBox}>
        <div>
          {sizeList.map((size, index) => {
            if (selectedSize === t(size.title)) {
              const IconComponent = size.Icon;
              return (
                <div key={index} className={styles.listItem}>
                  <IconComponent className={styles.icon} />
                  <div className={styles.textContent}>
                    <h3>{t(size.title)}</h3>
                    <p>{size.description}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
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
    </div>
  );
};

export default GenerateTextTemplate;
