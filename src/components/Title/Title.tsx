import React from "react";
import { IconType } from "react-icons";
import styles from "./Title.module.css";

interface TitleProps {
  title: string;
  icon: IconType;
  description?: string;
}

const Title: React.FC<TitleProps> = ({ title, icon: Icon, description }) => {
  return (
    <div className={styles.titleCard}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export default Title;
