import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Password.module.css";
import { Button } from "@mui/material";
import InputModern from "../../utils/InputModern/InputModern";
import { changePassword } from "../../../api/setting";

const Password = () => {
  const { t } = useTranslation();
  const [Password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [updatingPassword, setUpdatingPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleUpdatePassword = async () => {
    //validate password. it cant be empty
    if (!Password) {
      setError("Password cannot be empty");
      return;
    }

    //validate password length. it must be at least 8 characters
    if (Password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    //validate password and confirm password match
    if (Password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setUpdatingPassword(true);
      const response = await changePassword(Password);
      if (response.status === 200) {
        setError("");
        setPassword("");
        setConfirmPassword("");
        setUpdatingPassword(false);
      } else {
        setError("Error updating password");
      }
    } catch (error) {
      setError("Error updating password");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t("Password.changePassword")}</p>
      <p className={styles.description}>{t("Password.nextLogin")}</p>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <InputModern
            label={t("Password.newPassword")}
            placeholder="XXXXXXXXXXXXX"
            value={Password}
          />
        </div>

        <div className={styles.inputContainer}>
          <InputModern
            label={t("Password.confirmNewPassword")}
            placeholder="XXXXXXXXXXXXX"
            value={confirmPassword}
          />
          <Button
            variant="contained"
            className={styles.saveButton}
            size="large"
            onClick={() => handleUpdatePassword()}
          >
            {updatingPassword ? t("Password.updating") : t("Password.update")}
          </Button>
        </div>
        <p className={styles.error}>{error}</p>
      </div>
    </div>
  );
};

export default Password;
