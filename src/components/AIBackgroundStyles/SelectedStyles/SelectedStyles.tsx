import React from "react";
import styles from "./SelectedStyles.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import StyleBox from "../../utils/StyleBox/StyleBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";

const SelectedStyles = () => {
  const { t } = useTranslation();
  const selectedStyles = useSelector(
    (state: RootState) => state.productCreativeSlice.selectedStyles
  );

  return (
    <div className={styles.container}>
      <div className={styles.iconWithText}>
        <FaCheck className={styles.iconPurple} />{" "}
        <div className={styles.titleContainer}>
          <p className={styles.title}>{t("SelectedStyles.title")}</p>
          <p className={styles.subtitle}>{t("SelectedStyles.subtitle")}</p>
        </div>
      </div>
      {selectedStyles.length > 0 && (
        <div className={styles.stylesBoxAll}>
          {selectedStyles
            .slice(0, 6)
            .map(
              (style: { id: number; base64Image: string }, index: number) => (
                <StyleBox
                  key={index}
                  id={style.id}
                  imageSrc={style.base64Image}
                  onClick={(id) => console.log(`Clicked style ${id}`)}
                  isSelected={true}
                />
              )
            )}
        </div>
      )}
    </div>
  );
};

export default SelectedStyles;
