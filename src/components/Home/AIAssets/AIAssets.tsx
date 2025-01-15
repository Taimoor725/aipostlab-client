import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AIAssets.module.css";
import Timeline from "../Timeline/Timeline";
import ImageBox from "../ImageBox/ImageBox";
import image1 from "../../../assets/home/1.jpg";
import image2 from "../../../assets/home/2.jpg";
import image3 from "../../../assets/home/3.jpg";
import image4 from "../../../assets/home/4.jpg";

const AIAssets = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{t("AIAssets.title")}</div>
        <div className={styles.rectangle}>
          <Timeline />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageBox}>
          <ImageBox imageSrc={image1} />
        </div>
        <div className={styles.imageBox}>
          <ImageBox imageSrc={image2} />
        </div>
        <div className={styles.imageBox}>
          <ImageBox imageSrc={image3} />
        </div>
        <div className={styles.imageBox}>
          <ImageBox imageSrc={image4} />
        </div>
      </div>
    </div>
  );
};

export default AIAssets;
