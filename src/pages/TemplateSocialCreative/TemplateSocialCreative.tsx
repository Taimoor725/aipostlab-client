import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./TemplateSocialCreative.module.css";
import TemplatePreview from "./TemplatePreview";
import { getSocialTemplates, getContentData } from "../../api/project"; // API call to get templates and content
import { useParams, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoxData from "../../components/utils/BoxData/BoxData";
import CheckIcon from "@mui/icons-material/Check";
import MultipleImageContainer from "../../components/utils/ImageContainer/MultipleImageContainer";
import { FaDownload, FaEdit } from "react-icons/fa"; // Add FaEdit for edit icon
import LoadingSpinner from "../../components/utils/LoadingSpinner/LoadingSpinner";
import { useTranslation } from "react-i18next"; // Add this line for translations
import { image } from "html2canvas/dist/types/css/types/image";

const TemplateSocialCreative = () => {
  // Define the TemplateLayout interface
  interface TemplateLayout {
    headline: {
      fontSize: string;
      color: string;
      position: { top: string; left: string; transform: string };
    };
    punchline: {
      fontSize: string;
      color: string;
      position: { top: string; left: string; transform: string };
    };
    callToActionText: {
      fontSize: string;
      color: string;
      position: { top: string; left: string; transform: string };
    };
    logoUrl: {
      position: { top: string; left: string };
      width: string;
    };
    backgroundImage: string;
    blackOverlay: boolean;
    imageSize: string;
  }

  interface Template {
    id: string;
    name: string;
    layout: TemplateLayout; // Changed layout to TemplateLayout type
    dateCreated: string;
  }

  interface Content {
    headline: string;
    punchline: string;
    callToActionText: string;
    backgroundImageUrl: string;
    logoUrl: string;
    imageSize: string;
    blackOverlay: boolean;
  }

  const { id } = useParams<{ id: string }>();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [contentData, setContentData] = useState<Content | null>(null);
  const [logourl, setLogoUrl] = useState<string>("");
  const { t } = useTranslation(); // Add this line for translations
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Fetch all templates and content
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getSocialTemplates();
        const data = await response.json();
        const templatesArray = data.$values;

        // Parse the layout string as JSON and set templates
        const templatesWithLayout = templatesArray.map((template: any) => ({
          ...template,
          layout: JSON.parse(template.layout), // Parse the layout string
        }));

        setTemplates(templatesWithLayout);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    const fetchContentData = async () => {
      try {
        if (!id) {
          console.error("No ID provided");
          return;
        }
        const response = await getContentData(id); // Assuming you have an endpoint to get content data by ID
        const data = await response.json();
        setContentData(data.content);
        setLogoUrl(data.logoUrl);
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };

    fetchTemplates();
    fetchContentData();
  }, [id]);

  const handleDownload = async (templateId: string) => {
    const templateElement = document.getElementById(`template-${templateId}`);
    if (!templateElement) return;

    try {
      const canvas = await html2canvas(templateElement, { useCORS: true });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `template-${templateId}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleEdit = (template: Template) => {
    const layers = [
      {
        id: "headline",
        content: contentData?.headline || "",
        color: template.layout.headline.color,
        x: parseFloat(template.layout.headline.position.left),
        y: parseFloat(template.layout.headline.position.top),
        fontSize: parseInt(template.layout.headline.fontSize),
        fontStyle: "Regular",
      },
      {
        id: "punchline",
        content: contentData?.punchline || "",
        color: template.layout.punchline.color,
        x: parseFloat(template.layout.punchline.position.left),
        y: parseFloat(template.layout.punchline.position.top),
        fontSize: parseInt(template.layout.punchline.fontSize),
        fontStyle: "Regular",
      },
      {
        id: "callToActionText",
        content: contentData?.callToActionText || "",
        color: template.layout.callToActionText.color,
        x: parseFloat(template.layout.callToActionText.position.left),
        y: parseFloat(template.layout.callToActionText.position.top),
        fontSize: parseInt(template.layout.callToActionText.fontSize),
        fontStyle: "Regular",
      },
    ];

    navigate("/creative-editor", {
      state: {
        image: contentData?.backgroundImageUrl,
        layers,
        logo: logourl,
        imageSize: contentData?.imageSize,
        initialPositions: {
          headline: template.layout.headline.position,
          punchline: template.layout.punchline.position,
          callToActionText: template.layout.callToActionText.position,
          logo: template.layout.logoUrl.position,
        },
      },
    });
  };

  if (!contentData)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("TemplateSocialCreative.generatedAdCreativeTitle")} // Update this line for translation
        subtitle={t("TemplateSocialCreative.generatedAdCreativeSubtitle")} // Update this line for translation
        Icon={RocketLaunchIcon}
      />

      <div className={styles.boxDataWrapper}>
        <BoxData
          leftText={t("TemplateSocialCreative.selectCreativeSize")} // Update this line for translation
          icon={<CheckIcon />}
          rightText={
            contentData.imageSize == "Post Size"
              ? "1080*1080"
              : contentData.imageSize == "Landscape Size"
              ? "1200*628"
              : contentData.imageSize == "Story Size"
              ? "1080*1920"
              : "1000*1500"
          }
        />
        <BoxData
          leftText={t("TemplateSocialCreative.textOnImage")} // Update this line for translation
          icon={<CheckIcon />}
          rightText={t("TemplateSocialCreative.textInputs")} // Update this line for translation
        />
        <BoxData
          leftText={t("TemplateSocialCreative.chooseBackgroundImage")} // Update this line for translation
          icon={<CheckIcon />}
          rightText={t("TemplateSocialCreative.selectedImage")} // Update this line for translation
        />
      </div>

      <div className={styles.multipleImageContainer}>
        {templates.map((template) => (
          <div key={template.id} className={styles.imageWrapper}>
            <div
              id={`template-${template.id}`}
              className={styles.imageContainer}
            >
              <TemplatePreview
                template={template}
                content={contentData}
                logoUrl={logourl}
                scale={0.37} // Add this line to scale down the preview (400/1080 ≈ 0.37)
              />
            </div>
            <button
              className={styles.downloadButton}
              onClick={() => handleDownload(template.id)}
            >
              {t("TemplateSocialCreative.download")} <FaDownload />
            </button>
            <button
              className={styles.editButton}
              onClick={() => handleEdit(template)}
            >
              {t("TemplateSocialCreative.edit")} <FaEdit />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSocialCreative;
