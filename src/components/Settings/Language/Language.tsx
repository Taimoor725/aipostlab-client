import React from "react";
import styles from "./Language.module.css";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = React.useState(
    Cookies.get("language") || "US"
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    Cookies.set("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.LeftContainer}>
        <p className={styles.title}>{t("Billing.selectLanguage")}</p>
        <p className={styles.description}>{t("Billing.description")}</p>
      </div>
      <div className={styles.RightContainer}>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          className={styles.select}
        >
          <MenuItem value="TR">
            <ReactCountryFlag countryCode="TR" svg className={styles.flag} />
            {t("Language.Turkish")}
          </MenuItem>
          <MenuItem value="US">
            <ReactCountryFlag countryCode="US" svg className={styles.flag} />
            {t("Language.English")}
          </MenuItem>
          <MenuItem value="NL">
            <ReactCountryFlag countryCode="NL" svg className={styles.flag} />
            {t("Language.Dutch")}
          </MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Language;
