import React, { useEffect, useState } from "react";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import styles from "./ProductCreativePreview.module.css";
import { useParams } from "react-router-dom";
import { getGeneratedProducts } from "../../api/product";
import { FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductCreativePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imagesBase64, setImagesBase64] = useState<
    { id: string; base64Image: string }[] | null
  >(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getMonoStyles = async () => {
      try {
        if (id) {
          const response = await getGeneratedProducts(id);
          const data = await response.json();
          setImagesBase64(data.$values);
        } else {
          console.error("ID is undefined");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMonoStyles();
  }, [id]);

  const handleDownload = (id: string) => {
    const image = imagesBase64?.find((image) => image.id === id);
    if (image) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${image.base64Image}`;
      link.download = "GeneratedCreative.png";
      link.click();
    }
  };

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("TemplateSocialCreative.generatedAdCreativeTitle")}
        subtitle={t("TemplateSocialCreative.generatedAdCreativeSubtitle")}
        Icon={RocketLaunchIcon}
      />

      <div className={styles.multipleImageContainer}>
        {imagesBase64?.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img
                src={`data:image/png;base64,${image.base64Image}`}
                alt={t("TemplateSocialCreative.generatedAdCreativeTitle")}
              />
              <button
                className={styles.downloadButton}
                onClick={() => handleDownload(image.id)}
              >
                {t("TemplateSocialCreative.download")} <FaDownload />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCreativePreview;
