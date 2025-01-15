import React, { useState } from "react";
import styles from "./GeneratedText.module.css";
import { useDispatch } from "react-redux";
import { updateGenerateTextFormFields } from "../../../services/SocialCreativeSlice";
import { FaBrain } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  improveCallToAction,
  improveHeadline,
  improvePunchline,
} from "../../../api/project";

const GenerateTextForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [fields, setFields] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    dispatch(
      updateGenerateTextFormFields({
        [name]: value,
      })
    );
  };

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = () => setShowPicker(true);
  const closePicker = () => setShowPicker(false);
  const selectIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    closePicker();
  };

  // const updateGenerateTextFormFieldsData = useSelector((store: RootState) => store.SocialCreativeSlice.GenerateTextFormFields)
  // console.log('updateGenerateTextFormFieldsData ', updateGenerateTextFormFieldsData)
  const handleImproveHeadline = async () => {
    //validate the fields.field1 is no empty
    if (!fields.field1) {
      return;
    }

    try {
      const response = await improveHeadline(fields.field1);

      if (!response.ok) {
        throw new Error("Failed to improve headline");
      }

      const data = await response.json();
      setFields((prevFields) => ({
        ...prevFields,
        field1: data.improvedHeadline,
      }));

      dispatch(
        updateGenerateTextFormFields({
          field1: data.improvedHeadline,
        })
      );
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleImprovePunchline = async () => {
    //validate the fields.field2 is no empty
    if (!fields.field2) {
      return;
    }

    try {
      const response = await improvePunchline(fields.field2);

      if (!response.ok) {
        throw new Error("Failed to improve punchline");
      }

      const data = await response.json();
      setFields((prevFields) => ({
        ...prevFields,
        field2: data.improvedPunchline,
      }));

      dispatch(
        updateGenerateTextFormFields({
          field2: data.improvedPunchline,
        })
      );
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleImproveCallToAction = async () => {
    //validate the fields.field3 is no empty
    if (!fields.field3) {
      return;
    }

    try {
      const response = await improveCallToAction(fields.field3);

      if (!response.ok) {
        throw new Error("Failed to improve call to action");
      }

      const data = await response.json();

      setFields((prevFields) => ({
        ...prevFields,
        field3: data.improvedCallToAction,
      }));

      dispatch(
        updateGenerateTextFormFields({
          field3: data.improvedCallToAction,
        })
      );
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <div className={styles.topicText}>{t("GenerateTextForm.topicText")}</div>
      <div className={styles.subText}>{t("GenerateTextForm.subText")}</div>
      <div className={styles.inputIconField}>
        <input
          type="text"
          id="field1"
          name="field1"
          placeholder={t("TemplateImage.field1")}
          value={fields.field1}
          onChange={handleChange}
          className={styles.inputField}
        />
        <div className={styles.icon} onClick={handleImproveHeadline}>
          <FaBrain className={styles.iconCenter} />
        </div>
      </div>
      <div className={styles.inputIconField}>
        <input
          type="text"
          id="field2"
          name="field2"
          placeholder={t("TemplateImage.field2")}
          value={fields.field2}
          onChange={handleChange}
          className={styles.inputField}
        />
        <div className={styles.icon} onClick={handleImprovePunchline}>
          <FaBrain className={styles.iconCenter} />
        </div>
      </div>
      <div className={styles.inputIconField}>
        <input
          type="text"
          id="field3"
          name="field3"
          placeholder={t("TemplateImage.field3")}
          value={fields.field3}
          onChange={handleChange}
          className={styles.inputField}
        />
        <div className={styles.icon} onClick={handleImproveCallToAction}>
          <FaBrain className={styles.iconCenter} />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {/* <div className={styles.inputField}>
                <div className={styles.actionIcon}
                    onClick={openPicker}
                >
                    <span> Call to action icon</span>
                    <ArrowRightAltOutlinedIcon />
                </div>


            </div> */}
      {/* {showPicker && (
                <IconPickerPopup onClose={closePicker} onSelect={selectIcon} />
            )} */}
    </div>
  );
};

export default GenerateTextForm;
