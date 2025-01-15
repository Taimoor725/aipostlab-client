import React from "react";
import styles from "./Setting.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "../../components/utils/Button/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Billing from "../../components/Settings/Billing/Billing";
import Card from "../../components/Settings/Card/Card";
import Language from "../../components/Settings/Language/Language";
import PersonalInformation from "../../components/Settings/PersonalInformation/PersonalInformation";
import Password from "../../components/Settings/Password/Password";
import { useTranslation } from "react-i18next";

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const [isBilling, setIsBilling] = React.useState(false);
  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("Settings.title")}
        subtitle={t("Settings.subtitle")}
        Icon={TuneIcon}
        hiddenDropdown
      />
      <div className={styles.ButtonContainer}>
        {/* Account and billing Button */}
        <Button
          label={t("Settings.account")}
          onClick={() => setIsBilling(false)}
          Icon={AccountCircleIcon}
          className={!isBilling ? styles.selected : ""}
        />
        <Button
          label={t("Settings.billing")}
          onClick={() => setIsBilling(true)}
          Icon={CreditCardIcon}
          className={isBilling ? styles.selected : ""}
        />
      </div>
      {isBilling ? (
        <div className={styles.BillingContainer} style={{ marginLeft: "48px" }}>
          <Billing />
          <Card />
        </div>
      ) : (
        <div className={styles.AccountContainer} style={{ marginLeft: "48px" }}>
          <Language />
          <div className={styles.RowContainer}>
            <PersonalInformation />
            <Password />
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
