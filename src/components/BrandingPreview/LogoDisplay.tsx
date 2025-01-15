import React from "react";
import styles from "./BrandingPreview.module.css";

interface LogoDisplayProps {
  logoUrl: string;
  brandName: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logoUrl, brandName }) => {
  return (
    <div className={styles.logoContainer}>
      <img src={logoUrl} alt={`${brandName} logo`} className={styles.logo} />
      <h3 className={styles.brandName}>{brandName}</h3>
    </div>
  );
};

export default LogoDisplay;
