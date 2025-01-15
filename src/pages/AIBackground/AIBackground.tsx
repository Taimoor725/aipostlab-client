import React, { useEffect } from "react";
import styles from "./AIBackground.module.css";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";
import Button from "../../components/utils/Button/Button";
import PresetStyles from "../../components/AIBackgroundStyles/PresetStyles/PresetStyles";
import SelectedStyles from "../../components/AIBackgroundStyles/SelectedStyles/SelectedStyles";
import CustomStyles from "../../components/AIBackgroundStyles/CustomStyles/CustomStyles";
import StyleMatch from "../../components/AIBackgroundStyles/StyleMatch/StyleMatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GenerateProduct } from "../../api/product";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  clearImage,
  clearSelectedStyles,
  clearProjectName,
} from "../../services/ProductCreative";
import { useTranslation } from "react-i18next";

const AIBackground: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [presetStyleIds, setPresetStyleIds] = React.useState<number[]>([]);
  const selectedPresetStyles = useSelector(
    (state: RootState) => state.productCreativeSlice.selectedStyles
  );
  const backgroundImage = useSelector(
    (state: RootState) => state.productCreativeSlice.image
  );
  const projectName = useSelector(
    (state: RootState) => state.productCreativeSlice.projectName
  );

  // Get brand from Redux store
  const brand = useSelector(
    (state: RootState) => state.brand.selectedBrand || { id: "" }
  ) as { id: string };

  const userId = Cookies.get("userId") || "";

  useEffect(() => {
    if (selectedPresetStyles.length > 0) {
      const ids = selectedPresetStyles.map((style) => style.id);
      setPresetStyleIds(ids);
    }
  }, [selectedPresetStyles]);

  const handleGenerate = async () => {
    try {
      if (presetStyleIds.length === 0) {
        setError(t("AIBackground.error.selectStyle"));
        return;
      }
      if (backgroundImage === null) {
        setError(t("AIBackground.error.selectImage"));
        return;
      }

      setIsGenerating(true);
      const response = await GenerateProduct(
        projectName,
        presetStyleIds,
        backgroundImage,
        userId || "1",
        parseInt(brand.id, 10) || 2
      );
      if (!response.ok) {
        setError(t("AIBackground.error.generateFailed"));
        return;
      }
      const data = await response.json();
      //data remove of redux

      dispatch(clearSelectedStyles());
      dispatch(clearImage());
      dispatch(clearProjectName());

      navigate("/product-creative/" + data.project.id);
    } catch (error) {
      console.error(t("AIBackground.error.unknown"), error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("AIBackground.title")}
        subtitle={t("AIBackground.subtitle")}
        Icon={RocketLaunchIcon}
      />

      <div className={styles.styleContainer}>
        <div className={styles.styleWrapper}>
          <PresetStyles />
          <CustomStyles />
          <StyleMatch />
        </div>
        <div className={styles.selectedStylesWrapper}>
          <SelectedStyles />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          label={
            isGenerating
              ? t("AIBackground.generating")
              : t("AIBackground.generate")
          }
          onClick={handleGenerate}
          color="#9a32ef"
          size="medium"
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default AIBackground;
