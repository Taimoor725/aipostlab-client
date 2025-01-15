import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Timeline.module.css";

const Timeline = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.item}>
        {t("Timeline.brand")} <span className={styles.correctMark}>✔</span>
      </div>
      <div className={styles.separator}>-</div>
      <div className={styles.item}>
        {t("Timeline.size")} <span className={styles.correctMark}>✔</span>
      </div>
      <div className={styles.separator}>-</div>
      <div className={styles.item}>
        {t("Timeline.texts")} <span className={styles.correctMark}>✔</span>
      </div>
      <div className={styles.separator}>-</div>
      <div className={styles.item}>
        {t("Timeline.image")} <span className={styles.correctMark}>✔</span>
      </div>
    </div>
  );
};

export default Timeline;
