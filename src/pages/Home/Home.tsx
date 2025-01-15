import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import Title from "../../components/utils/Title/Title";
import { Button } from "@mui/material";
import AIAssets from "../../components/Home/AIAssets/AIAssets";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <Title
        title={t("Home.title")}
        subTitle1={t("Home.subTitle1")}
        boldPart={t("Home.boldPart")}
        subTitle2={t("Home.subTitle2")}
      />
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => navigate("/sign-up")}
        >
          {t("Home.buttonText")}
        </Button>
      </div>

      <AIAssets />
    </div>
  );
};

export default Home;
