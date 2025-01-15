import React from "react";
import styles from "./BrandingPreview.module.css";
import LogoDisplay from "./LogoDisplay";
import ColorPalette from "./ColorPalette";

interface BrandingPreviewProps {
  logoUrl: string;
  brandName: string;
  colorTheme: string[];
}

const BrandingPreview: React.FC<BrandingPreviewProps> = ({
  logoUrl,
  brandName,
  colorTheme,
}) => {
  return (
    <div className={styles.previewContainer}>
      {logoUrl && <LogoDisplay logoUrl={logoUrl} brandName={brandName} />}

      <ColorPalette colors={colorTheme} />
    </div>
  );
};

export default BrandingPreview;
