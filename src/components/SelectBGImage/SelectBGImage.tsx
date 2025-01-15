import React, { useRef, useState } from "react";
import styles from "./SelectBGImage.module.css";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Button from "../utils/Button/Button";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
//import "react-image-picker-editor/dist/index.css";
import { useDispatch } from "react-redux";
import { updateImageString } from "../../services/SocialCreativeSlice";
import GoogleImageSearch from "../GoogleImageSearch/GoogleImageSearch";
import { fetchImage } from "../../api";
import { useTranslation } from "react-i18next";

const SelectBGImage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleLocal = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (url: string) => {
    try {
      // Call the backend API to fetch the image
      setIsDownloading(true);
      const response = await fetchImage(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image from backend");
      }

      const base64String = await response.text(); // Get base64 string

      // Ensure the base64 string has the correct prefix
      const imageSrc = `data:image/jpeg;base64,${base64String}`; // Change the MIME type if needed (e.g., 'image/png' or 'image/jpg')

      setSelectedImage(imageSrc);
      dispatch(updateImageString(imageSrc)); // Save to Redux
      setShowSearch(false);
    } catch (error) {
      console.error(t("SelectBGImage.errors.fetchImage"));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        dispatch(updateImageString(base64String));
        setShowSearch(false);
      };
      reader.onerror = () => {
        console.error(t("SelectBGImage.errors.fileRead"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.IconContainer}>
        <UploadFileOutlinedIcon
          sx={{ fontSize: 80, transform: "scale(0.9)" }}
        />
      </div>
      <div className={styles.headText}>
        {t("SelectBGImage.updateBackgroundImage")}
      </div>
      <div className={styles.subText}>{t("SelectBGImage.dragDrop")}</div>
      <div className={styles.buttonContainer}>
        <Button
          label={t("SelectBGImage.searchImages")}
          onClick={handleSearch}
          color="#000000"
          size="medium"
          Icon={ImageSearchOutlinedIcon}
        />
        <Button
          label={t("SelectBGImage.yourLibrary")}
          onClick={handleLocal}
          color="#9a32ef"
          size="medium"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showSearch && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button
              className={styles.closeButtonPopup}
              onClick={() => setShowSearch(false)}
            >
              ✕
            </button>
            <GoogleImageSearch
              onSelectImage={handleImageSelect}
              isDownloading={isDownloading}
            />
          </div>
        </div>
      )}

      <div className={styles.imageContainer}>
        {selectedImage && (
          <div className={styles.imageWrapper}>
            <button className={styles.closeButton} onClick={handleClose}>
              X
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className={styles.imageDisplay}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBGImage;
