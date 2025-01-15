import React from "react";

import styles from "./ImageBox.module.css";

interface ImageBoxProps {
  imageSrc: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ imageSrc }) => {
  return (
    <div className={styles.imageBox}>
      <div className={styles.galleryItem}>
        <img
          src={imageSrc}
          alt="Gallery"
          className={`${styles.image} ${styles.fitImage}`}
        />
      </div>
    </div>
  );
};

export default ImageBox;
