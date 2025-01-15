import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Add this import
import styles from "./GoogleImageSearch.module.css";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

interface GoogleImageSearchProps {
  onSelectImage: (url: string) => void;
  isDownloading?: boolean;
}

const GoogleImageSearch: React.FC<GoogleImageSearchProps> = ({
  onSelectImage,
  isDownloading,
}) => {
  const { t } = useTranslation(); // Add this line
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const allImages: string[] = [];
      const numResults = 30; // Total number of images to fetch
      const resultsPerPage = 10; // Number of images per request

      for (let start = 1; start <= numResults; start += resultsPerPage) {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${SEARCH_ENGINE_ID}&key=${GOOGLE_API_KEY}&searchType=image&num=${resultsPerPage}&start=${start}`
        );
        const data = await response.json();
        const items = data.items || [];
        const imageUrls = items.map((item: any) => item.link);
        allImages.push(...imageUrls);
      }

      setImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("GoogleImageSearch.searchPlaceholder")}
        className={styles.searchInput}
      />
      <button
        onClick={handleSearch}
        className={styles.searchButton}
        disabled={loading}
      >
        {isDownloading
          ? t("GoogleImageSearch.downloading")
          : loading
          ? t("GoogleImageSearch.searching")
          : t("GoogleImageSearch.search")}{" "}
      </button>
      <div className={styles.imageGrid}>
        {images.map((url) => (
          <img
            key={url}
            src={url}
            alt={t("GoogleImageSearch.searchResultAlt")} // Update this line
            className={styles.image}
            onClick={() => onSelectImage(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default GoogleImageSearch;
