import React from "react";

import styles from "./AppBarMain.module.css";
import Cookies from "js-cookie";

import Logo from "../../../assets/aiposlab_logo.svg";
import { NavLink } from "react-router-dom";
import { Button, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const AppBarMain: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = React.useState(
    Cookies.get("language") || "US"
  );

  const menuItems = [
    {
      path: "#home",
      label: t("AppBarMain.Home"),
      id: "home",
    },
    {
      path: "#features",
      label: t("AppBarMain.Features"),
      id: "features",
    },
    {
      path: "#pricing",
      label: t("AppBarMain.Pricing"),
      id: "pricing",
    },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    Cookies.set("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <header className={styles.appBar}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Your Brand Logo" className={styles.logo} />
      </div>
      <div className={styles.rightContainer}>
        <nav className={styles.navMenu}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className={styles.activeIndicator}></div>

              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.SelectionContainer}>
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
        <div className={styles.ButtonContainer}>
          <Button
            className={styles.buttonLogIn}
            onClick={() => navigate("/login")}
          >
            {t("AppBarMain.LogIn")}
          </Button>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.buttonWide}`}
            onClick={() => navigate("/sign-up")}
          >
            {t("AppBarMain.TryForFreeNow")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppBarMain;
