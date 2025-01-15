import React from "react";
import styles from "./Billing.module.css";
import { Button } from "@mui/material";
import InputModern from "../../utils/InputModern/InputModern";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Billing = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <p className={styles.title}>{t("Billing.billingInformation")}</p>{" "}
      {/* Use translation */}
      <p className={styles.description}>
        {t("Billing.billingDescription")} {/* Use translation */}
      </p>
      <div className={styles.inputGroup}>
        <InputModern
          label={t("Billing.fullName")}
          placeholder="XXXXXXXXXXXXX"
        />{" "}
        {/* Use translation */}
        <InputModern
          label={t("Billing.email")}
          placeholder="XXXXXXXXXXXXX"
        />{" "}
        {/* Use translation */}
        <InputModern
          label={t("Billing.companyOptional")}
          placeholder="XXXXXXXXXXXXX"
        />{" "}
        {/* Use translation */}
        <InputModern
          label={t("Billing.euVat")}
          placeholder="XXXXXXXXXXXXX"
        />{" "}
        {/* Use translation */}
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="contained" className={styles.saveButton} size="large">
          {t("Billing.save")} {/* Use translation */}
        </Button>
      </div>
    </div>
  );
};

export default Billing;
