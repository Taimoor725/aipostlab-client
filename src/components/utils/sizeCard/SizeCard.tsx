import React from "react";
import styles from "./SizeCard.module.css";
import { SvgIconComponent } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectSize } from "../../../services/SocialCreativeSlice";
import { RootState } from "../../../store/store";

interface ProjectBoxProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  alignLeft?: boolean;
  navigateDir?: string;
  id: string;
}

const SizeCard: React.FC<ProjectBoxProps> = ({
  title,
  description,
  Icon,
  alignLeft,
  navigateDir,
  id,
}) => {
  const dispatch = useDispatch();
  const handleClickImageSize = (id: string) => {
    dispatch(selectSize(id));
  };
  const selectedSize = useSelector(
    (state: RootState) => state.SocialCreativeSlice.selectedSize
  );

  return (
    <div
      className={`${styles.contentContainer} ${
        selectedSize === id ? styles.selected : ""
      }`}
      onClick={() => handleClickImageSize(id)}
    >
      <div className={styles.contentParent}>
        <div>
          <div
            className={`${styles.imageContainer} ${
              alignLeft ? styles.leftAlign : ""
            }`}
          >
            <Icon sx={{ fontSize: 100, transform: "scale(0.9)" }} />
          </div>
          <div className={styles.titleText}>{title}</div>
          <div className={styles.descriptionText}>{description}</div>
        </div>
      </div>
    </div>
  );
};
export default SizeCard;
