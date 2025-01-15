import React, { useEffect } from "react";
import styles from "./ProjectTitle.module.css";
import PageTitleBar from "../utils/PageTitleBar/PageTitleBar";
import Dropdown from "../utils/Dropdown/Dropdown";
import { SvgIconComponent } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedBrand, setBrandLogoUrl } from "../../services/brandSlice";
import { fetchBrands } from "../../api";
import { useTranslation } from "react-i18next";

interface ProjectTitleProps {
  title: string;
  subtitle: string;
  Icon: SvgIconComponent;
  hiddenDropdown?: boolean;
  isDefault?: boolean;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({
  title,
  subtitle,
  Icon,
  hiddenDropdown,
  isDefault = true,
}) => {
  const dispatch = useDispatch();
  const selectedBrand = useSelector(
    (state: RootState) =>
      state.brand.selectedBrand as { name: string; id: number } | null
  );
  const [brandOptions, setBrandOptions] = React.useState<any[]>([]);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAndSetBrands = async () => {
      try {
        const response = await fetchBrands();
        if (response.success) {
          const brands = response.data.$values;
          setBrandOptions(brands);
          if (!selectedBrand && isDefault) {
            dispatch(setSelectedBrand(brands[0])); // Save the entire brand object
            dispatch(setBrandLogoUrl(brands[0].logoUrl)); // Set the brand logo URL
          }
        } else {
          setApiError(response.message);
        }
      } catch (e) {
        if (e instanceof Error) {
          setApiError(e.message);
        } else {
          setApiError(String(e));
        }
      }
    };

    fetchAndSetBrands();
  }, [dispatch, selectedBrand, isDefault]);

  const handleBrandSelect = (brandName: string) => {
    const [id, name] = brandName.split(" - ");
    const selectedBrandData = brandOptions.find(
      (brand) => brand.id === parseInt(id)
    );

    if (selectedBrandData) {
      dispatch(setSelectedBrand(selectedBrandData)); // Save the entire brand object
      console.log("Selected brand:", selectedBrandData);
      dispatch(setBrandLogoUrl(selectedBrandData.logoUrl)); // Set the brand logo URL
    }
    console.log("Selected brand:", selectedBrandData);
  };

  return (
    <div className={styles.pageTitleContainer}>
      <PageTitleBar title={title} subtitle={subtitle} IconPath={"/icons/edit_square.svg"}/>

      {!hiddenDropdown && (
        <div className={styles.dropdownContainer}>
          <Dropdown
            label={t("ProjectTitle.dropDownLabel")}
            options={brandOptions.map((brand) => brand.id + " - " + brand.name)} // Map to brand names for dropdown
            onSelect={handleBrandSelect}
            selectedValue={
              selectedBrand
                ? `${selectedBrand.id} - ${selectedBrand.name}`
                : t("ProjectTitle.dropDownLabel")
            } // Pass selectedBrand.name as selectedValue
          />
        </div>
      )}
    </div>
  );
};

export default ProjectTitle;
