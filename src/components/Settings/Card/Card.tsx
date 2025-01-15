import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Card.module.css";
import { Button } from "@mui/material";
import InputModern2 from "../../utils/InputModern2/InputModern2";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InputModern3 from "../../utils/InputModern3/InputModern3";

const Card = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t("Card.cardInformation")}</p>
      <p className={styles.description}>{t("Card.cardDescription")}</p>
      <div className={styles.inputGroup}>
        <InputModern2
          icon={<CreditCardIcon />}
          placeholder={t("Card.cardNumber")}
        />
        <div className={styles.inputContainer}>
          <InputModern3 placeholder={t("Card.expiryDate")} />
          <InputModern3 placeholder={t("Card.cvc")} />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="contained" className={styles.saveButton} size="large">
          {t("Card.save")}
        </Button>
      </div>
    </div>
  );
};

export default Card;
