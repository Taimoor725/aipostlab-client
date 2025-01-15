import React from "react";
import "./ImageContainer.css";
import { FaDownload } from "react-icons/fa";

interface ImageContainerProps {
  imageUrl: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ imageUrl }) => {
  return (
    <div className="image-wrapper">
      <div className="image-container">
        <img src={imageUrl} alt="Image" className="image" />
        <button className="download-button">
          Download <FaDownload />
        </button>
      </div>
    </div>
  );
};

export default ImageContainer;
