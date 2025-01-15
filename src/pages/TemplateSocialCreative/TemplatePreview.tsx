import React from "react";
import styles from "./TemplatePreview.module.css";

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

interface TemplateProps {
  template: {
    id: string;
    name: string;
    layout: TemplateLayout;
    dateCreated: string;
  };
  content: {
    headline: string;
    punchline: string;
    callToActionText: string;
    logoUrl: string;
    backgroundImageUrl: string;
    imageSize: string;
  };
  logoUrl: string;
  scale?: number; // Add scale prop
}

const TemplatePreview: React.FC<TemplateProps> = ({
  template,
  content,
  logoUrl,
  scale = 1, // Default scale to 1 if not provided
}) => {
  const { layout } = template;

  const getWidth = () => {
    switch (content.imageSize) {
      case "Post Size":
        return 1080;
      case "Landscape Size":
        return 1200;
      case "Story Size":
        return 1080;
      case "Pin Size":
        return 1000;
      default:
        return "auto";
    }
  };

  const getHeight = () => {
    switch (content.imageSize) {
      case "Post Size":
        return 1080;
      case "Landscape Size":
        return 628;
      case "Story Size":
        return 1920;
      case "Pin Size":
        return 1500;
      default:
        return "auto";
    }
  };

  const scaledStyle = (style: React.CSSProperties) => ({
    ...style,
    transform: `scale(${scale})`,
    transformOrigin: "top left",
  });

  return (
    <div className={styles.templateWrapper}>
      <div
        className={styles.templateContainer}
        style={scaledStyle({
          backgroundImage: `url(${content.backgroundImageUrl})`,
          backgroundSize: "cover",
          width: `${getWidth()}px`,
          height: `${getHeight()}px`,
          position: "relative",
        })}
      >
        {/* Black Overlay */}
        {/* {layout.blackOverlay && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 1,
            }}
          ></div>
        )} */}

        {/* Logo */}
        <div
          className={styles.logo}
          style={{
            position: "absolute",
            top: layout.logoUrl.position.top,
            left: layout.logoUrl.position.left,
          }}
        >
          <img src={logoUrl} alt="Logo" width={layout.logoUrl.width} />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: layout.headline.fontSize,
            color: layout.headline.color,
            position: "absolute",
            top: layout.headline.position.top,
            left: layout.headline.position.left,
            transform: layout.headline.position.transform,
          }}
        >
          {content.headline}
        </h1>

        {/* Punchline */}
        <p
          style={{
            fontSize: layout.punchline.fontSize,
            color: layout.punchline.color,
            position: "absolute",
            top: layout.punchline.position.top,
            left: layout.punchline.position.left,
            transform: layout.punchline.position.transform,
          }}
        >
          {content.punchline}
        </p>

        {/* Call to Action Text */}
        <button
          style={{
            fontSize: layout.callToActionText.fontSize,
            color: layout.callToActionText.color,
            position: "absolute",
            top: layout.callToActionText.position.top,
            left: layout.callToActionText.position.left,
            transform: layout.callToActionText.position.transform,
          }}
        >
          {content.callToActionText}
        </button>
      </div>
    </div>
  );
};

export default TemplatePreview;
