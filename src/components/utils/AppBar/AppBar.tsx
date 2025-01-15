import React from "react";
import {
  FaCloudDownloadAlt,
  FaUpload,
  FaCog,
  FaBell,
  FaStar,
  FaFire,
} from "react-icons/fa";
import styles from "./AppBar.module.css";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ButtonIconSecondary from "../ButtonIconSecondary/ButtonIconSecondary";
import IconButton from "../IconButton/IconButton";
import theme from "../../../config/theme";
import Logo from "../../../assets/aiposlab_logo.svg";
import {
  FaChartLine,
  FaLightbulb,
  FaBrain,
  FaTools,
  FaCogs,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../../api/auth";
import { useTranslation } from "react-i18next";

const AppBar: React.FC = () => {
  const { t } = useTranslation();
  const menuItems = [
    { path: "/brand-setup", label: t("AppBar.Brands"), icon: <FaStar /> },
    { path: "/project-setup", label: t("AppBar.Projects"), icon: <FaCog /> },
    {
      path: "/competitor-insights",
      label: t("AppBar.CompetitorInsights"),
      icon: <FaChartLine />,
    },
    {
      path: "/inspiration-bank",
      label: t("AppBar.InspirationBank"),
      icon: <FaLightbulb />,
    },
    {
      path: "/scoring-ai",
      label: t("AppBar.ScoringAI"),
      icon: <FaBrain />,
    },
    {
      path: "/settings",
      label: t("AppBar.Settings"),
      icon: <FaCogs />,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
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
            >
              <div className={styles.activeIndicator}></div>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.iconButtonContainer}>
          <div className={styles.iconButton}>
            <IconButton
              icon={<FaBell />}
              onClick={() => handleLogout()}
              size="medium"
              bgColor={theme.palette.background.paper}
              iconColor={theme.palette.primary.main}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
