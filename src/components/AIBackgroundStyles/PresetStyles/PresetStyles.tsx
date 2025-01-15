import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PresetStyles.module.css";
import InputFieldSingle from "../../utils/InputSingle/InputSingle";
import InputFieldLabel from "../../utils/InputLabel/InputLabel";
import StyleBox from "../../utils/StyleBox/StyleBox";
import Button from "../../utils/Button/Button";
import { GetStyles } from "../../../api/product";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStyles } from "../../../services/ProductCreative";
import { RootState } from "../../../store/store";

const PresetStyles = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [expandedMono, setExpandedMono] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [specialOccasion, setSpecialOccasion] = useState("");
  const [expandedInterior, setExpandedInterior] = useState(false);
  const [monoStylesBase64, setMonoStylesBase64] = useState<
    { id: number; base64Image: string }[]
  >([]);
  const [interiorStylesBase64, setInteriorStylesBase64] = useState<
    { id: number; base64Image: string }[]
  >([]);
  const selectedStyles = useSelector(
    (state: RootState) => state.productCreativeSlice.selectedStyles
  );

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChangeSpecialOccasion = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialOccasion(e.target.value);
  };

  const handleStyleClick = (id: number, base64Image: string) => {
    const isSelected = selectedStyles.some(
      (style: { id: number; base64Image: string }) => style.id === id
    );
    let newSelected;
    if (isSelected) {
      newSelected = selectedStyles.filter(
        (style: { id: number; base64Image: string }) => style.id !== id
      );
    } else {
      if (selectedStyles.length >= 6) {
        alert("You can select a maximum of 6 styles.");
        return;
      }
      newSelected = [...selectedStyles, { id, base64Image }];
    }
    dispatch(setSelectedStyles(newSelected));
  };

  useEffect(() => {
    //getmonostyle function
    const getMonoStyles = async () => {
      try {
        const response = await GetStyles("mono");
        const data = await response.json();
        setMonoStylesBase64(
          data.$values.map((item: any) => ({
            id: item.id,
            base64Image: item.base64Image,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    //getinteriorstyle function
    const getInteriorStyles = async () => {
      try {
        const response = await GetStyles("interior");
        const data = await response.json();
        setInteriorStylesBase64(
          data.$values.map((item: any) => ({
            id: item.id,
            base64Image: item.base64Image,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    getMonoStyles();
    getInteriorStyles();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{t("PresetStyles.title")}</p>
          <p
            className={styles.seeAllText}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? t("PresetStyles.collapse") : t("PresetStyles.seeAll")}
          </p>
        </div>
        <p className={styles.subtitle}>{t("PresetStyles.subtitle")}</p>
      </div>
      {expanded && (
        <div className={styles.content}>
          <p className={styles.title2}>{t("PresetStyles.filter")}</p>
          <input
            type="text"
            id=""
            name="Search"
            placeholder={t("PresetStyles.searchPlaceholder")}
            value={searchText}
            onChange={handleChangeSearchText}
            className={styles.inputField}
          />
          <input
            type="text"
            id="specialOccasion"
            name="specialOccasion"
            placeholder={t("PresetStyles.specialOccasionPlaceholder")}
            value={specialOccasion}
            onChange={handleChangeSpecialOccasion}
            className={styles.inputField}
          />
          <p className={styles.title3}>{t("PresetStyles.aiRecommendations")}</p>
          <div className={styles.titleContainer}>
            <p className={styles.title3}>{t("PresetStyles.mono")}</p>
            <p
              className={styles.seeAllText}
              onClick={() => setExpandedMono(!expandedMono)}
            >
              {expandedMono
                ? t("PresetStyles.collapse")
                : t("PresetStyles.seeAll")}
            </p>
          </div>
          {expandedMono ? (
            <div className={styles.stylesBoxAll}>
              {monoStylesBase64.map((style, index) => (
                <StyleBox
                  key={index}
                  id={style.id}
                  imageSrc={style.base64Image}
                  onClick={() => handleStyleClick(style.id, style.base64Image)}
                  isSelected={selectedStyles.some(
                    (s: { id: number; base64Image: string }) =>
                      s.id === style.id
                  )}
                />
              ))}
            </div>
          ) : (
            <div className={styles.stylesBox}>
              {monoStylesBase64.slice(0, 3).map((style, index) => (
                <StyleBox
                  key={index}
                  id={style.id}
                  imageSrc={style.base64Image}
                  onClick={() => handleStyleClick(style.id, style.base64Image)}
                  isSelected={selectedStyles.some((s) => s.id === style.id)}
                />
              ))}
            </div>
          )}
          <div className={styles.titleContainer}>
            <p className={styles.title3}>{t("PresetStyles.interior")}</p>
            <p
              className={styles.seeAllText}
              onClick={() => setExpandedInterior(!expandedInterior)}
            >
              {expandedInterior
                ? t("PresetStyles.collapse")
                : t("PresetStyles.seeAll")}
            </p>
          </div>
          {expandedInterior ? (
            <div className={styles.stylesBoxAll}>
              {interiorStylesBase64.map((style, index) => (
                <StyleBox
                  key={index}
                  id={style.id}
                  imageSrc={style.base64Image}
                  onClick={() => handleStyleClick(style.id, style.base64Image)}
                  isSelected={selectedStyles.some((s) => s.id === style.id)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.stylesBox}>
              {interiorStylesBase64.slice(0, 3).map((style, index) => (
                <StyleBox
                  key={index}
                  id={style.id}
                  imageSrc={style.base64Image}
                  onClick={() => handleStyleClick(style.id, style.base64Image)}
                  isSelected={selectedStyles.some((s) => s.id === style.id)}
                />
              ))}
            </div>
          )}
          <div className={styles.buttonWrapper}>
            <Button
              label={t("PresetStyles.showAll")}
              onClick={() => {}}
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PresetStyles;
