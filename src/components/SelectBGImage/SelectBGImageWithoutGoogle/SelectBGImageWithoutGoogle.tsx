import React, { useRef, useState } from "react";
import styles from "./SelectBGImageWithoutGoogle.module.css";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Button from "../../utils/Button/Button";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
//import "react-image-picker-editor/dist/index.css";
import { useDispatch } from "react-redux";
import { setImage } from "../../../services/ProductCreative";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";

const SelectBGImageWithoutGoogle: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleLocal = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        dispatch(setImage(base64String));
        setShowSearch(false);
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
    </div>
  );
};

export default SelectBGImageWithoutGoogle;
