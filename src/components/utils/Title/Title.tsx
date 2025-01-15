import React from "react";
import styles from "./Title.module.css";

//dynamic title component
export interface TitleProps {
  title: string;
  subTitle1?: string;
  boldPart?: string;
  subTitle2?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  subTitle1,
  boldPart,
  subTitle2,
}) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      {(subTitle1 || boldPart) && (
        <p className={styles.subtitle}>
          {subTitle1}
          {boldPart && <span className={styles.bold}>{boldPart}</span>}
        </p>
      )}
      {subTitle2 && <p className={styles.subtitle}>{subTitle2}</p>}
    </div>
  );
};

export default Title;
