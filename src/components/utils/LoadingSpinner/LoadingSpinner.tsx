//center screen loading spinner

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
