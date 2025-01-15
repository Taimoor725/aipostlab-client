import React, { useState } from "react";
import styles from "./ImportFromWebsite.module.css";
import { FaPaperclip } from "react-icons/fa";
import Button from "../utils/Button/Button";
import InputFieldSingle from "../utils/InputSingle/InputSingle";
import { getDetailsByWebSite } from "../../api";
import { useTranslation } from "react-i18next";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface ImportFromWebsiteProps {
  onImport: (
    name: string,
    description: string,
    logo: string[],
    color: string[],
    logoWithColors: { logo: string; colors: { $values: string[] } }[]
  ) => void; // Callback to pass data back
}

const ImportFromWebsite: React.FC<ImportFromWebsiteProps> = ({ onImport }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error message

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(""); // Clear error on new input
  };

  const handleImport = async () => {
    if (!url) {
      setError(t("ImportFromWebsite.errors.enterUrl")); // User feedback for empty URL
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await getDetailsByWebSite(url);

      if (!response.ok) {
        throw new Error(t("ImportFromWebsite.errors.failedToFetch"));
      }

      const data = await response.json();
      console.log(t("ImportFromWebsite.success.importedData"), data);

      // Call the onImport function with the brand name and generated description
      onImport(
        data.name,
        data.generatedDescription,
        data.images.$values,
        data.themeColors.$values.length > 0
          ? data.themeColors.$values
          : ["#ffffff"],
        data.logoWithColors.$values
      );
    } catch (error) {
      console.error(t("ImportFromWebsite.errors.importingData"), error);
      setError(t("ImportFromWebsite.errors.importingData"));
    } finally {
      setLoading(false); // End loading state
      setUrl("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FaPaperclip className={styles.icon} />
      </div>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{t("ImportFromWebsite.title")}</div>
      </div>
      <div className={styles.inputContainer}>
        <InputFieldSingle
          label={t("ImportFromWebsite.urlLabel")}
          value={url}
          onChange={handleInputChange}
          type="url"
          placeholder={t("ImportFromWebsite.urlPlaceholder")}
        />
        {error && <div className={styles.error}>{error}</div>}{" "}
        {/* Error display */}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          label={
            loading
              ? t("ImportFromWebsite.importing")
              : t("ImportFromWebsite.importBrand")
          } // Button label based on loading state
          onClick={handleImport}
          color="#9a32ef"
          size="small"
          disabled={loading} // Disable button while loading
        />
      </div>
    </div>
  );
};

export default ImportFromWebsite;
