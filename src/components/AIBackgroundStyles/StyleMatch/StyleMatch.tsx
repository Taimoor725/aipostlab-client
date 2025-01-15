import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Add this import
import styles from "./StyleMatch.module.css";
import { FaCheck } from "react-icons/fa";
import Button from "../../utils/Button/Button";
import SelectBGImageWithoutLibrary from "../../SelectBGImage/SelectBGImageWithoutLibrary/SelectBGImageWithoutLibrary";

const StyleMatch = () => {
  const { t } = useTranslation(); // Add this line
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
            <p className={styles.title}>{t("StyleMatch.title")}</p>{" "}
            {/* Update this line */}
            <p className={styles.subtitle}>{t("StyleMatch.subtitle")}</p>{" "}
            {/* Update this line */}
          </div>
        </div>
        {!expanded && (
          <div className={styles.buttonWrapper}>
            <Button
              label={t("StyleMatch.createButton")}
              size="small"
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
      </div>

      {expanded && (
        <>
          <div>
            <SelectBGImageWithoutLibrary />
          </div>
          <textarea
            id="field1"
            name="field1"
            placeholder={t("StyleMatch.textareaPlaceholder")}
            value={field1}
            onChange={handleChange}
            className={styles.inputField}
            maxLength={maxLength}
          />
          <p className={styles.charCount}>
            {field1.length}/{maxLength} {t("StyleMatch.characters")}
          </p>
          <div className={styles.buttonWrapper}>
            <Button
              label={t("StyleMatch.generateButton")}
              size="medium"
              onClick={() => console.log("Button clicked")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StyleMatch;
