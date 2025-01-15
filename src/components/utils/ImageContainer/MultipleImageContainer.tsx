import React from "react";
import ImageContainer from "./ImageContainer";
import "./MultipleImageContainer.css";

interface MultipleImageContainerProps {
  imageUrls: string[];
}

const MultipleImageContainer: React.FC<MultipleImageContainerProps> = ({
  imageUrls,
}) => {
  return (
    <div className="multiple-image-container">
      {imageUrls.map((url, index) => (
        <ImageContainer key={index} imageUrl={url} />
      ))}
    </div>
  );
};

export default MultipleImageContainer;
