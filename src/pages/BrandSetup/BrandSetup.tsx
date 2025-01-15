// src/pages/brandSetup.tsx
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import styles from "./BrandSetup.module.css";
import { FaStar } from "react-icons/fa";
import ImportFromWebsite from "../../components/ImportFromWebsite/ImportFromWebsite";
import BrandDetails from "../../components/Brand/BrandDetails/BrandDetails";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import BrandColor from "../../components/Brand/BrandColor/BrandColor";
import Button from "../../components/utils/Button/Button";
import BrandingPreview from "../../components/BrandingPreview/BrandingPreview";
import Dropdown from "../../components/utils/Dropdown/Dropdown";
import { FaBolt } from "react-icons/fa";
import ButtonIcon from "../../components/utils/ButtonIcon/ButtonIcon";
import Cookies from "js-cookie";
import {
  fetchBrands,
  submitBrand,
  fetchBrandById,
  updateBrand,
} from "../../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandDesign from "../../components/Brand/BrandDesign/BrandDesign";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BrandSetup: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logoUrls, setLogoUrls] = useState<string[]>([]);
  const [selectedLogoUrls, setSelectedLogoUrls] = useState<string[]>([]);
  const [selectedBrandColors, setSelectedBrandColors] = useState<string[]>([]);
  const [brandColors, setBrandColors] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [brandOptions, setBrandOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoWithColors, setLogoWithColors] = useState<
    { logo: string; colors: { $values: string[] } }[]
  >([]);
  const [brandId, setBrandId] = useState<string>("");

  useEffect(() => {
    const fetchBrandOptions = async () => {
      try {
        const response = await fetchBrands();
        const brands = response.data.$values.map((brand: any) => ({
          id: brand.id,
          name: brand.name,
        }));
        setBrandOptions(brands);
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };

    fetchBrandOptions();
  }, []);

  const handleImport = (
    name: string,
    desc: string,
    logo: string[],
    color: string[],
    logoWithColors: { logo: string; colors: { $values: string[] } }[]
  ) => {
    setBrandName(name);
    setDescription(desc);
    setLogoUrls(logo);
    setBrandColors(logoWithColors[0].colors.$values);
    setLogoWithColors(logoWithColors);
  };

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (
      !brandName ||
      !description ||
      logoUrls.length === 0 ||
      brandColors.length === 0
    ) {
      setErrorMessage(t("BrandSetup.errors.allFieldsRequired"));
      return;
    }

    setErrorMessage(""); // Clear any previous error message

    const user = Cookies.get("userId");

    if (brandId === "") {
      const brandData = {
        brandName: brandName,
        website: "", // Assuming website is not provided in the form
        description: description,
        logoUrl: logoUrls[0], // Assuming the first logo URL is the main logo
        color1: brandColors[0] || "", // Assuming the first color is the main color
        color2: brandColors[1] || "", // Optional second color
        additionalColor1: brandColors[2] || "", // Optional additional color 1
        additionalColor2: brandColors[3] || "", // Optional additional color 2
        userId: user,
      };

      try {
        setLoading(true);
        const response = await submitBrand(brandData);

        if (response.ok) {
          console.log(t("BrandSetup.success.brandCreated"));
          navigate("/project-setup");
        } else {
          console.error(t("BrandSetup.errors.failedToCreateBrand"));
        }
      } catch (error) {
        console.error(t("BrandSetup.errors.errorCreatingBrand"), error);
      } finally {
        setLoading(false);
      }
    } else {
      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    if (
      !brandName ||
      !description ||
      logoUrls.length === 0 ||
      brandColors.length === 0
    ) {
      setErrorMessage(t("BrandSetup.errors.allFieldsRequired"));
      return;
    }

    setErrorMessage(""); // Clear any previous error message

    const user = Cookies.get("userId");

    const brandData = {
      id: brandId,
      brandName: brandName,
      website: "", // Assuming website is not provided in the form
      description: description,
      logoUrl: logoUrls[0], // Assuming the first logo URL is the main logo
      color1: brandColors[0] || "", // Assuming the first color is the main color
      color2: brandColors[1] || "", // Optional second color
      additionalColor1: brandColors[2] || "", // Optional additional color 1
      additionalColor2: brandColors[3] || "", // Optional additional color 2
      userId: user,
    };

    try {
      setLoading(true);
      const response = await updateBrand(brandData);

      if (response.ok) {
        console.log(t("BrandSetup.success.brandUpdated"));
        navigate("/project-setup");
      } else {
        console.error(t("BrandSetup.errors.failedToUpdateBrand"));
      }
    } catch (error) {
      console.error(t("BrandSetup.errors.errorUpdatingBrand"), error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandColorChange = (logo: string) => {
    //setBrandColors with mapping logo with logoWithColors
    console.log(logoWithColors);
    const selectedBrand = logoWithColors.find((item) => item.logo === logo);
    if (selectedBrand) {
      setBrandColors(selectedBrand.colors.$values);
    }
  };

  //get selected brand id fro redux
  const brand = useSelector((state: RootState) =>
    typeof state.brand.selectedBrand === "string"
      ? { id: state.brand.selectedBrand }
      : state.brand.selectedBrand || { id: "" }
  );

  //const when changing brand from dropdown
  useEffect(() => {
    const getBrand = async () => {
      try {
        const response = await fetchBrandById(brand.id);

        const brandData = response.data;
        setBrandId(brandData.id);
        setBrandName(brandData.name);
        setDescription(brandData.description);
        setLogoUrls([brandData.logoUrl]);
        setBrandColors([
          brandData.color1,
          brandData.color2,
          brandData.additionalColor1,
          brandData.additionalColor2,
        ]);
      } catch (error) {
        console.error("Error fetching brand", error);
      }
    };

    getBrand();
  }, [brand]);

  return (
    <div className={styles.container}>
      <ProjectTitle
        title={t("BrandSetup.title")}
        subtitle={t("BrandSetup.description")}
        Icon={DisplaySettingsOutlinedIcon}
        isDefault={false}
      />

      <div className={styles.form2}>
        <div className={styles.ImportWeb}>
          <div className={styles.formGroup}>
            <ImportFromWebsite onImport={handleImport} />
          </div>
        </div>
        <p className={styles.importText}>{t("BrandSetup.importText")}</p>
        <div className={styles.form}>
          <div className={styles.leftSection}>
            <div className={styles.formGroup}>
              <BrandDetails
                brandName={brandName}
                description={description}
                setBrandName={setBrandName}
                setDescription={setDescription}
              />
            </div>

            <div className={styles.formGroup}>
              <BrandLogo
                logos={logoUrls}
                onLogoSelect={(logo) => {
                  setSelectedLogoUrls([logo]);
                  handleBrandColorChange(logo);
                }}
                setLogoUrls={setLogoUrls}
              />
            </div>

            <div className={styles.formGroup}>
              <BrandColor
                colors={brandColors}
                onColorsChange={setBrandColors}
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <BrandDesign
              LogoImage={logoUrls[0] || ""}
              selectedBGColor={brandColors[0] || ""}
            />
          </div>
        </div>

        <div className={styles.submitButton}>
          <Button
            label={
              brand.id !== ""
                ? loading
                  ? t("BrandSetup.updating")
                  : t("BrandSetup.updateBrand")
                : loading
                ? t("BrandSetup.creating")
                : t("BrandSetup.createBrand")
            }
            size="small"
            onClick={handleSubmit}
          />
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};
export default BrandSetup;
