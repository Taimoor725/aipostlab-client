import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Pricing.module.css";
import Title from "../../components/utils/Title/Title";
import PlanBox from "../../components/Pricing/PlanBox/PlanBox";

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contentContainer}>
      <Title title={t("Pricing.title")} subTitle1={t("Pricing.subTitle1")} />
      <div className={styles.planContainer}>
        <PlanBox
          title={t("Pricing.starterPlans.title")}
          description1={t("Pricing.starterPlans.description1")}
          price={39}
          description2={t("Pricing.starterPlans.description2")}
          features={[
            t("Pricing.starterPlans.features.downloads"),
            t("Pricing.starterPlans.features.brandLimit"),
            t("Pricing.starterPlans.features.allAIAssets"),
            t("Pricing.starterPlans.features.unlimitedGenerations"),
            t("Pricing.starterPlans.features.textGeneratorAI"),
            t("Pricing.starterPlans.features.adPlatformIntegrations"),
            t("Pricing.starterPlans.features.unlimitedPhotos"),
            t("Pricing.starterPlans.features.insightAI"),
            t("Pricing.starterPlans.features.competitorInsights"),
            t("Pricing.starterPlans.features.totalUsers"),
          ]}
        />
        <PlanBox
          title={t("Pricing.proPlans.title")}
          description1={t("Pricing.proPlans.description1")}
          price={249}
          description2={t("Pricing.proPlans.description2")}
          features={[
            t("Pricing.proPlans.features.downloads"),
            t("Pricing.proPlans.features.brandLimit"),
            t("Pricing.proPlans.features.allAIAssets"),
            t("Pricing.proPlans.features.unlimitedGenerations"),
            t("Pricing.proPlans.features.textGeneratorAI"),
            t("Pricing.proPlans.features.adPlatformIntegrations"),
            t("Pricing.proPlans.features.unlimitedPhotos"),
            t("Pricing.proPlans.features.insightAI"),
            t("Pricing.proPlans.features.competitorInsights"),
            t("Pricing.proPlans.features.totalUsers"),
          ]}
        />
        <PlanBox
          title={t("Pricing.ultimatePlans.title")}
          description1={t("Pricing.ultimatePlans.description1")}
          price={599}
          description2={t("Pricing.ultimatePlans.description2")}
          features={[
            t("Pricing.ultimatePlans.features.downloads"),
            t("Pricing.ultimatePlans.features.brandLimit"),
            t("Pricing.ultimatePlans.features.allAIAssets"),
            t("Pricing.ultimatePlans.features.unlimitedGenerations"),
            t("Pricing.ultimatePlans.features.textGeneratorAI"),
            t("Pricing.ultimatePlans.features.adPlatformIntegrations"),
            t("Pricing.ultimatePlans.features.unlimitedPhotos"),
            t("Pricing.ultimatePlans.features.insightAI"),
            t("Pricing.ultimatePlans.features.competitorInsights"),
            t("Pricing.ultimatePlans.features.totalUsers"),
          ]}
        />
      </div>
    </div>
  );
};

export default Pricing;
