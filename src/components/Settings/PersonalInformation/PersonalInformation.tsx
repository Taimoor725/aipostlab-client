import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./PersonalInformation.module.css";
import { Button } from "@mui/material";
import InputModern from "../../utils/InputModern/InputModern";
import { changeFullName, changeEmail } from "../../../api/setting";

const PersonalInformation = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [updatingFullName, setUpdatingFullName] = React.useState(false);
  const [updatingEmail, setUpdatingEmail] = React.useState(false);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFullNameUpdate = async () => {
    //validate full name. it cant be empty
    if (!fullName) {
      setError("Full name cannot be empty");
      return;
    }
    try {
      setUpdatingFullName(true);
      const response = await changeFullName(fullName);
      if (response.status === 200) {
        setError("");
        setFullName("");
        setUpdatingFullName(false);
      } else {
        setError("Error updating full name");
      }
    } catch (error) {
      setError("Error updating full name");
    }
  };

  const handleEmailUpdate = async () => {
    //validate email. it cant be empty
    if (!email) {
      setError("Email cannot be empty");
      return;
    }

    //validate email format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailFormat)) {
      setError("Invalid email format");
      return;
    }

    try {
      setUpdatingEmail(true);
      const response = await changeEmail(email);
      if (response.status === 200) {
        setError("");
        setEmail("");
        setUpdatingEmail(false);
      } else {
        setError("Error updating email");
      }
    } catch (error) {
      setError("Error updating email");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {t("PersonalInformation.changePersonalInformation")}
      </p>
      <p className={styles.description}>
        {t("PersonalInformation.confirmEmail")}
      </p>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <InputModern
            label={t("PersonalInformation.fullName")}
            placeholder="XXXXXXXXXXXXX"
            value={fullName}
            onChange={handleFullNameChange}
          />
          <Button
            variant="contained"
            className={styles.saveButton}
            size="large"
            onClick={handleFullNameUpdate}
          >
            {updatingFullName
              ? t("PersonalInformation.updating")
              : t("PersonalInformation.update")}
          </Button>
        </div>

        <div className={styles.inputContainer}>
          <InputModern
            label={t("PersonalInformation.email")}
            placeholder="XXXXXXXXXXXXX"
            value={email}
            onChange={handleEmailChange}
          />
          <Button
            variant="contained"
            className={styles.saveButton}
            size="large"
            onClick={handleEmailUpdate}
          >
            {updatingEmail
              ? t("PersonalInformation.updating")
              : t("PersonalInformation.update")}
          </Button>
        </div>
        <p className={styles.error}>{error}</p>
      </div>
    </div>
  );
};

export default PersonalInformation;
