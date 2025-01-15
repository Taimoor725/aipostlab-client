import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CustomStyles.module.css";
import { FaCheck } from "react-icons/fa";
import Button from "../../utils/Button/Button";

const CustomStyles = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [field1, setField1] = useState("");
  const maxLength = 1000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setField1(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <div className={styles.iconWithText}>
          <FaCheck className={styles.iconPurple} />{" "}
          <div className={styles.titleContainer}>
            <p className={styles.title}>{t("CustomStyles.title")}</p>
            <p className={styles.subtitle}>{t("CustomStyles.subtitle")}</p>
          </div>
        </div>
        {!expanded && (
          <div className={styles.buttonWrapper}>
            <Button
              label={t("CustomStyles.createButton")}
              size="small"
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
      </div>

      {expanded && (
        <>
          <textarea
            id="field1"
            name="field1"
            placeholder={t("CustomStyles.textareaPlaceholder")}
            value={field1}
            onChange={handleChange}
            className={styles.inputField}
            maxLength={maxLength}
          />
          <p className={styles.charCount}>
            {field1.length}/{maxLength} {t("CustomStyles.characters")}
          </p>
          <div className={styles.buttonWrapper}>
            <Button
              label={t("CustomStyles.generateButton")}
              size="medium"
              onClick={() => console.log("Button clicked")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomStyles;
