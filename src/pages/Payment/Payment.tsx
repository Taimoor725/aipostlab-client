import React from "react";
import styles from "./Payment.module.css";
import Logo from "../../assets/aiposlab_logo.svg";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt={t("Payment.logoAlt")} className={styles.logo} />
      </div>
      <div className={styles.paymentPage}>
        <div className={styles.paymentDetails}>
          <h1 className={styles.paymentTitle}>{t("Payment.paymentDetails")}</h1>
          <p className={styles.trialInfo}>{t("Payment.trialInfo")}</p>
          <div className={styles.inputContainer}>
            <input
              type="gmail"
              className={styles.inputField}
              placeholder={t("Payment.cardHolderName")}
            />
            <div className={styles.cardNumberContainer}>
              <input
                type="gmail"
                className={styles.inputField}
                placeholder={t("Payment.cardNumber")}
              />
              <FaCreditCard className={styles.creditCardIcon} />
            </div>
            <div className={styles.inlineContainer}>
              <input
                type="gmail"
                className={styles.inputSmallLeft}
                placeholder={t("Payment.expiryDate")}
              />
              <input
                type="gmail"
                className={styles.inputSmallRight}
                placeholder={t("Payment.cvv")}
              />
            </div>
            <input
              type="gmail"
              className={styles.inputField}
              placeholder={t("Payment.country")}
            />
            <p className={styles.securityInfo}>{t("Payment.securityInfo")}</p>
          </div>
        </div>
      </div>
      <div className={styles.paymentButtonContainer}>
        <button className={styles.startTrialButton}>
          {t("Payment.startTrialButton")}
        </button>
        <p className={styles.loginText}>
          {t("Payment.haveAccount")}{" "}
          <span
            className={styles.loginLink}
            onClick={() => navigate("/login")}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {t("Payment.login")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Payment;
