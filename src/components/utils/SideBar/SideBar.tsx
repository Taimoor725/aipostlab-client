import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaStar,
  FaCog,
  FaBolt,
  FaChartLine,
  FaLightbulb,
  FaBrain,
  FaTools,
  FaCogs,
} from "react-icons/fa";
import styles from "./SideBar.module.css";
import Logo from "../../../assets/aiposlab_logo.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/brand-setup", label: "Brands", icon: <FaStar /> },
    { path: "/project-setup", label: "Projects", icon: <FaCog /> },
    {
      path: "/competitor-insights",
      label: "Competitor Insights",
      icon: <FaChartLine />, // Matching icon for Competitor Insights
    },
    {
      path: "/inspiration-bank",
      label: "Inspiration Bank",
      icon: <FaLightbulb />, // Matching icon for Inspiration Bank
    },
    {
      path: "/creative-scoring-ai",
      label: "Creative Scoring AI",
      icon: <FaBrain />, // Matching icon for Creative Scoring AI
    },
    {
      path: "/creative-utility-suite",
      label: "Creative Utility Suite",
      icon: <FaTools />, // Matching icon for Creative Utility Suite
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <FaCogs />, // Matching icon for Settings
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5189/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Your Brand Logo" className={styles.logo} />
      </div>
      <div className={styles.divider}>
        <ButtonIcon
          label="Generate"
          onClick={() => {}}
          icon={<FaBolt />}
          size="medium"
        />
      </div>
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
      {/*logou button that bottom of the side bar*/}
      <ButtonIcon
        label="Logout"
        onClick={() => handleLogout()}
        icon={<FaBolt />}
        size="medium"
      />
    </div>
  );
};

export default Sidebar;
