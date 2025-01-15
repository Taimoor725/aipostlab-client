import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./DescriptionBox.module.css";
// No additional imports needed for fetch
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const DescriptionBox = () => {
  const { t } = useTranslation();
  const [field1, setField1] = useState("");
  const [description, setDescription] = useState("");

  const image = useSelector(
    (state: RootState) => state.productCreativeSlice.image || null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField1(e.target.value);
  };

  useEffect(() => {
    console.log("Image changed:", image);
    handleUploadAndDescribe();
  }, [image]);

  const handleUploadAndDescribe = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    // Upload the image to Google Cloud Storage (if necessary) or pass it directly as base64

    const reader = new FileReader();
    const blob = new Blob([image], { type: "image/jpeg" }); // Adjust the type as needed
    reader.readAsDataURL(blob);

    reader.onloadend = async () => {
      const base64Image =
        typeof reader.result === "string" ? reader.result.split(",")[1] : ""; // Extract base64 string

      // Send the image to Google Vision API
      try {
        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCI2wEEFSCMQfSTPEoz-DdaNhWqd5OKjgA`, // Replace with your API key
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    content: base64Image,
                  },
                  features: [
                    {
                      type: "LABEL_DETECTION",
                      maxResults: 5,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const labels = data.responses[0].labelAnnotations;
        const descriptionText = labels
          .map((label: { description: string }) => label.description)
          .join(", ");
        setDescription(descriptionText);
        setField1(descriptionText); // Automatically fill field1 with the description
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };
  };

  return (
    <div className={styles.container}>
      <p className={styles.productTitle}>{t("DescriptionBox.productTitle")}</p>
      <input
        type="text"
        id="field1"
        name="field1"
        placeholder={t("DescriptionBox.field1Placeholder")}
        value={field1}
        onChange={handleChange}
        className={styles.inputField}
      />
      <div className={styles.iconWithText}>
        <FaCheck className={styles.iconPurple} />{" "}
        <p className={styles.text}>
          <strong>{t("DescriptionBox.do")} </strong> :{" "}
          {t("DescriptionBox.doDescription")}
        </p>
      </div>
      <div className={styles.iconWithText}>
        <FaTimes className={styles.iconBlack} />{" "}
        <p className={styles.text}>
          <strong>{t("DescriptionBox.dont")} </strong> :{" "}
          {t("DescriptionBox.dontDescription")}
        </p>
      </div>
      <p className={styles.moreText}>
        <strong>{t("DescriptionBox.tellMore")}</strong>
      </p>
      <input
        type="text"
        id="field2"
        name="field2"
        placeholder={t("DescriptionBox.field2Placeholder")}
        className={styles.inputField}
      />
    </div>
  );
};

export default DescriptionBox;
