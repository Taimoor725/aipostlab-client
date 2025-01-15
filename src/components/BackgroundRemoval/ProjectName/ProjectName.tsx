import React from "react";
import styles from "./ProjectName.module.css";
import { setProjectName } from "../../../services/ProductCreative";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ProjectName = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setProjectName(event.target.value));
  };

  return (
    <div className={styles.container}>
      <p className={styles.projectTitle}>{t("BackgroundImage.inputLabel")}</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder={t("BackgroundImage.placeholder")}
          className={styles.inputField}
          onChange={handleProjectNameChange}
        />
      </div>
    </div>
  );
};

export default ProjectName;
