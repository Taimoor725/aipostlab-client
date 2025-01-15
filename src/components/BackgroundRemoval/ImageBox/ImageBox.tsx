import React, { useEffect, useState, useCallback } from "react";
import styles from "./ImageBox.module.css";
import ButtonIcon from "../../utils/ButtonIcon/ButtonIcon";
import { FaCrop, FaEraser, FaTrash } from "react-icons/fa";
import SelectBGImageWithoutGoogle from "../../SelectBGImage/SelectBGImageWithoutGoogle/SelectBGImageWithoutGoogle";
import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import { setImage } from "../../../services/ProductCreative";
import { useTranslation } from "react-i18next";

interface ImageBoxProps {
  imageSrc: string | null;
}

const ImageBox: React.FC<ImageBoxProps> = ({ imageSrc }) => {
  const { t } = useTranslation();
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [image, setImages] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageSrc) {
      setImages(imageSrc);
    }
  }, [imageSrc]);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (!croppedAreaPixels || !image) return;

    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    const reader = new FileReader();
    reader.readAsDataURL(await (await fetch(croppedImage)).blob());
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setFinalImage(base64data);
      setImages(base64data);
      dispatch(setImage(base64data));
    };
    setIsCropping(false);
  };

  const getCroppedImg = (
    imageSrc: string,
    cropPixels: any
  ): Promise<string> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;

        // Clear the canvas before drawing the new image
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
          image,
          cropPixels.x,
          cropPixels.y,
          cropPixels.width,
          cropPixels.height,
          0,
          0,
          cropPixels.width,
          cropPixels.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handleBackgroundRemoval = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      const blob = await fetch(image).then((res) => res.blob());

      formData.append("image_file", blob);
      formData.append("size", "auto");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REACT_APP_REMOVE_BG_API_KEY || "", // Use API key from .env
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to remove background.");
      }

      const result = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setFinalImage(base64data);
        setImages(base64data);
        dispatch(setImage(base64data));
      };
    } catch (error) {
      console.error("Background removal failed:", error);
    }
  };

  const handleDeleteImage = () => {
    setImages(null);
    setFinalImage(null);
    dispatch(setImage(""));
  };

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      <div className={styles.imageContainer}>
        {finalImage ? (
          <img src={image || ""} alt="Cropped" />
        ) : isCropping ? (
          <Cropper
            image={imageSrc!}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        ) : imageSrc ? (
          <img src={imageSrc} alt="Selected" />
        ) : (
          <SelectBGImageWithoutGoogle />
        )}
      </div>
      {image && (
        <div className={styles.buttonContainer}>
          {isCropping ? (
            <ButtonIcon
              icon={<FaCrop />}
              label={t("ImageBox.applyCrop")}
              onClick={handleCropImage}
              size="customSmall"
            />
          ) : (
            <ButtonIcon
              icon={<FaCrop />}
              label={t("ImageBox.cropImage")}
              onClick={() => {
                setIsCropping(true);
                setFinalImage(null); // Reset finalImage to allow multiple crops
              }}
              size="customSmall"
            />
          )}
          <ButtonIcon
            icon={<FaEraser />}
            label={t("ImageBox.removeBackground")}
            onClick={handleBackgroundRemoval}
            size="customSmall"
          />
          <ButtonIcon
            icon={<FaTrash />}
            label={t("ImageBox.deleteImage")}
            onClick={handleDeleteImage}
            size="customSmall"
          />
        </div>
      )}
    </div>
  );
};

export default ImageBox;
