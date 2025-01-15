import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Add this import
import styles from "./BrandDetails.module.css";
import InputFieldLabel from "../../utils/InputLabel/InputLabel";
import Button from "../../utils/Button/Button";
import { FaStar } from "react-icons/fa";

interface BrandDetailsProps {
  brandName: string;
  description: string;
  setBrandName: (name: string) => void;
  setDescription: (desc: string) => void;
}

const BrandDetails: React.FC<BrandDetailsProps> = ({
  brandName,
  description,
  setBrandName,
  setDescription,
}) => {
  const { t } = useTranslation(); // Add this line
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState(brandName);
  const [desc, setDesc] = useState(description);

  useEffect(() => {
    setName(brandName); // Update state when props change
    setDesc(description); // Update state when props change
  }, [brandName, description]);

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSaveAndContinue = () => {
    setBrandName(name);
    setDescription(desc);
    console.log("Brand Name:", name);
    console.log("Description:", desc);
    // Add your save logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleExpandToggle}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>
            <FaStar />
          </span>{" "}
          {/* You can use any icon here */}
        </div>
        <h2 className={styles.title}>{t("BrandDetails.writeBrandName")}</h2>{" "}
        {/* Update this line */}
        <div className={styles.expandIcon}>{isExpanded ? "-" : "+"}</div>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.descriptionWrapper}>
            <InputFieldLabel
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("BrandDetails.enterBrandName")} // Update this line
              maxLength={100}
              isTextArea={true}
              rows={1}
            />
          </div>
          <div className={styles.descriptionWrapper}>
            <InputFieldLabel
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t("BrandDetails.enterDescription")} // Update this line
              maxLength={5000}
              isTextArea={true}
              rows={5}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              label={t("BrandDetails.saveAndContinue")} // Update this line
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

export default BrandDetails;
