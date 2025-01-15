import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Add this import
import styles from "./BrandLogo.module.css";
import Button from "../utils/Button/Button";
import { FaRegBuilding, FaExclamationTriangle, FaUpload } from "react-icons/fa";

interface BrandLogoProps {
  logos: string[]; // Array of logo URLs to display
  onLogoSelect: (logo: string) => void; // Add this prop
  setLogoUrls: (logos: string[]) => void;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  logos,
  onLogoSelect,
  setLogoUrls,
}) => {
  const { t } = useTranslation(); // Add this line
  const [isExpanded, setIsExpanded] = useState(false);
  const [logo, setLogo] = useState<string | null>(logos[0] || null); // Set default logo

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSaveAndContinue = () => {
    // Add your save logic here
  };

  useEffect(() => {
    setLogo(logos[0] || null); // Set default logo on logos change
  }, [logos]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newLogoUrl = URL.createObjectURL(file);
      setLogo(newLogoUrl);
      setLogoUrls([newLogoUrl, ...logos]);
    }
  };

  const handleLogoClick = (logoUrl: string) => {
    setLogo(logoUrl);
    onLogoSelect(logoUrl); // Notify parent component
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleExpandToggle}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>
            <FaRegBuilding />
          </span>{" "}
          {/* You can use any icon here */}
        </div>
        <h2 className={styles.title}>{t("BrandLogo.selectBrandLogo")}</h2>{" "}
        {/* Update this line */}
        <div className={styles.expandIcon}>{isExpanded ? "-" : "+"}</div>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div>
            <p className={styles.description}>
              {t("BrandLogo.uploadDescription")} {/* Update this line */}
            </p>
          </div>
          {/*warning  text with icon and yellow background*/}
          <div className={styles.warningText}>
            <span className={styles.warningIcon}>
              <FaExclamationTriangle />
            </span>
            <p>
              {t("BrandLogo.warningText")} {/* Update this line */}
            </p>
          </div>
          <div className={styles.uploadBox}>
            <label htmlFor="logoUpload" className={styles.uploadLabel}>
              <FaUpload className={styles.uploadIcon} />
              <span className={styles.uploadText}>
                {logo
                  ? t("BrandLogo.logoSelected")
                  : t("BrandLogo.uploadPlaceholder")}{" "}
                {/* Update this line */}
              </span>
              <input
                id="logoUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.uploadInput}
              />
            </label>
          </div>
          {logo && (
            <div className={styles.logoPreview}>
              <h3>Selected Logo:</h3>
              <img
                src={logo} // Use the logo URL directly
                alt="Selected logo"
                className={styles.logoImage}
              />
            </div>
          )}
          <div className={styles.logoContainer}>
            <h3>Expected Logos:</h3>
            <div className={styles.logoGrid}>
              {logos.map((logoUrl1, index) => (
                <img
                  key={index}
                  src={logoUrl1}
                  alt={`Logo ${index + 1}`}
                  className={`${styles.logoImage} ${
                    logo === logoUrl1 ? styles.selectedLogo : ""
                  }`} // Highlight selected logo
                  onClick={() => handleLogoClick(logoUrl1)} // Add click handler
                />
              ))}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              label={t("BrandLogo.saveAndContinue")}
              onClick={handleSaveAndContinue}
              color="#9a32ef"
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
