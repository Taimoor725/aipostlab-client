import React, { useState, useEffect } from "react";
import styles from "./BackgroundImage.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SelectBGImage from "../../components/SelectBGImage/SelectBGImage";
import Button from "../../components/utils/Button/Button";
import { useNavigate } from "react-router-dom";
import TemplateImage from "../../components/utils/TemplateImage/TemplateImage";
import InputFieldOptional from "../../components/utils/InputFieldOptional/InputFiledOptinal";
import { useDispatch, useSelector } from "react-redux";
import { updateSocialProjectName } from "../../services/SocialCreativeSlice";
import { GenerateSocialProject } from "../../api/project";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const BackGroundImage: React.FC = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();

  // Get project name from Redux store
  const projectName = useSelector(
    (state: any) => state.SocialCreativeSlice?.socialProjectName || ""
  );

  // Get brand from Redux store
  const brand = useSelector(
    (state: RootState) => state.brand.selectedBrand || { id: "" }
  );

  const imageString = useSelector(
    (state: any) => state.SocialCreativeSlice?.imageString || ""
  );

  // Get GenerateTextFormFields from Redux store
  const generateTextFormFields = useSelector(
    (state: any) => state.SocialCreativeSlice?.GenerateTextFormFields || {}
  );

  const imageSize = useSelector(
    (state: any) => state.SocialCreativeSlice?.selectedSize || ""
  );

  // Local state to handle immediate input changes
  const [localProjectName, setLocalProjectName] = useState(projectName);

  // Sync local state with Redux state when Redux state changes
  useEffect(() => {
    setLocalProjectName(projectName);
  }, [projectName]);

  console.log("image size", imageSize);

  // Handle typing in input field
  const handleProjectNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setLocalProjectName(newValue); // Update local state immediately for a responsive UI
    dispatch(updateSocialProjectName(newValue)); // Dispatch update to Redux
  };

  //handle generate
  const handleGenerate = async () => {
    if (
      !imageSize ||
      !imageString ||
      (typeof brand === "string" ? !brand : !brand.id)
    ) {
      setApiError(t("BackgroundImage.apiError"));
      return;
    }

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("brandId", typeof brand === "string" ? brand : brand.id); // Use brand.id if brand is an object, otherwise use brand directly

      // Convert base64 image string to a Blob and append to formData
      const byteString = atob(imageString.split(",")[1]);
      const mimeString = imageString.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append("image", blob, "image.png");

      formData.append("headline", generateTextFormFields.field1);
      formData.append("punchline", generateTextFormFields.field2);
      formData.append("callToAction", generateTextFormFields.field3);
      formData.append("imageSize", imageSize);

      const response = await GenerateSocialProject(formData);

      // Redirect to the newly created project if success
      if (response?.data?.id) {
        navigate(`/project/${response.data.id}`);
      } else {
        throw new Error("Failed to generate social project");
      }
    } catch (err) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError(t("BackgroundImage.unknownError"));
      }
      console.log(err);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("BackgroundImage.title")}
        subtitle={t("BackgroundImage.subtitle")}
        Icon={InsertPhotoOutlinedIcon}
        hiddenDropdown={true}
      />
      <div
        className={styles.subContentContainer}
        onClick={() => setPopupOpen(true)}
      >
        <InsertPhotoOutlinedIcon
          sx={{ fontSize: 100, transform: "scale(4)" }}
          color="primary"
        />
      </div>
      <div className={styles.subContentContainer}>
        <TemplateImage />
      </div>
      <div className={styles.projectNameContainer}>
        <InputFieldOptional
          label={t("BackgroundImage.inputLabel")}
          value={localProjectName} // Use local state here for immediate reflection
          onChange={handleProjectNameChange}
          placeholder={t("BackgroundImage.placeholder")}
          maxLength={50}
        />
      </div>
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button
              className={styles.closeButton}
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <SelectBGImage />
          </div>
        </div>
      )}
      {apiError && (
        <div style={{ color: "red", textAlign: "center" }}>{apiError}</div>
      )}
      <div className={styles.buttonWrapper}>
        <Button
          label={
            isGenerating
              ? t("BackgroundImage.generating")
              : t("BackgroundImage.generate")
          }
          onClick={handleGenerate}
          color="#9a32ef"
          size="medium"
        />
      </div>
    </div>
  );
};

export default BackGroundImage;
