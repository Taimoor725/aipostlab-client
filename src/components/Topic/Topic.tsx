// src/components/Topic/Topic.tsx

import React from "react";
import { IconType } from "react-icons"; // Import IconType for typing
import styles from "./Topic.module.css";

interface TopicProps {
  title: string;
  description: string;
  icon: IconType; // Accepts an icon component
  onClick?: () => void;
}

const Topic: React.FC<TopicProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className={styles.topicCard} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Topic;
