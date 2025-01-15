import React from "react";
import styles from "./PlanBox.module.css";
import { Button } from "@mui/material";

interface PlanBoxProps {
  title: string;
  description1: string;
  price: number;
  description2: string;
  features: string[];
}

const PlanBox: React.FC<PlanBoxProps> = ({
  title,
  description1,
  price,
  description2,
  features,
}) => {
  return (
    <div className={styles.planBox}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description1}</p>
      <p className={styles.price}>
        $<span className={styles.priceValue}>{price}</span>/month
      </p>
      <p className={styles.description}>{description2}</p>
      <ul className={styles.packageList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.packageItem}>
            <span className={styles.checkMark}>✔</span>{" "}
            {index < 2 ? <strong>{feature}</strong> : feature}
          </li>
        ))}
      </ul>
      <Button variant="contained" className={styles.button}>
        Start Free Trial
      </Button>
    </div>
  );
};

export default PlanBox;
