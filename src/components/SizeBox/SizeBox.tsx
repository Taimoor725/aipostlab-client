import React from "react";
import styles from "./SizeBox.module.css";
import SizeCard from "../utils/sizeCard/SizeCard";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
//twitter icon
import { Twitter } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "react-i18next";

const SizeBox: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.fullContentContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.leftTitleContainer}>
            <div className={styles.headText}>
              {t("SizeBox.socialMediaSizes")}
            </div>
            <div className={styles.subText}>
              {t("SizeBox.socialMediaSubtitle")}
            </div>
          </div>
          <div className={styles.rightTitleContainer}>
            <LinkedInIcon />
            <FacebookIcon />
            <PinterestIcon />
            <InstagramIcon />
            <Twitter />
          </div>
        </div>
        <div className={styles.gridStyles}>
          <SizeCard
            title={t("SizeBox.postSize")}
            description="1080 x 1080"
            Icon={InstagramIcon}
            id="Post Size"
          />
          <SizeCard
            title={t("SizeBox.landscapeSize")}
            description="1200 x 628"
            Icon={LinkedInIcon}
            id="Landscape Size"
          />
          <SizeCard
            title={t("SizeBox.storySize")}
            description="1080 x 1920"
            Icon={FacebookIcon}
            id="Story Size"
          />
          <SizeCard
            title={t("SizeBox.portraitSize")}
            description="1080 x 1350"
            Icon={Twitter}
            id="Portrait Size"
          />
          <SizeCard
            title={t("SizeBox.pinSize")}
            description="1000 x 1500"
            Icon={PinterestIcon}
            id="Pin Size"
          />
        </div>
      </div>
      {/*<div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.leftTitleContainer}>
            <div className={styles.headText}>Display Sizes</div>
            <div className={styles.subText}>
              Most common sizes for display advertising.{" "}
            </div>
          </div>
          <div className={styles.rightTitleContainer}>
            <LinkedInIcon />
            <FacebookIcon />
            <PinterestIcon />
            <InstagramIcon />
            <Twitter />
          </div>
        </div>
        <div className={styles.gridStyles}>
          <SizeCard
            title="Medium Banner"
            description="300 x 250
"
            Icon={InstagramIcon}
            id="Post Size"
          />
          <SizeCard
            title="Leaderboard"
            description="728 x 90
"
            Icon={LinkedInIcon}
            id="Landscape Size"
          />
          <SizeCard
            title="Wide Skyscraper"
            description="160 x 600
"
            Icon={FacebookIcon}
            id="Story Size"
          />
          <SizeCard
            title="Half Page"
            description="300 x 600
"
            Icon={Twitter}
            id="Portrait Size"
          />
          <SizeCard
            title="L. Leaderboard"
            description="970 x 90
"
            Icon={PinterestIcon}
            id="Pin Size"
          />
        </div>
      </div>*/}
    </div>
  );
};

export default SizeBox;
