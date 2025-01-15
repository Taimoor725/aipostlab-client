import React from "react";
import styles from './ProjectBox.module.css'
import { SvgIconComponent } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ProjectBoxProps {
    title: string;
    description: string;
    Icon: SvgIconComponent;
    alignLeft?: boolean;
    navigateDir?: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ title, description, Icon, alignLeft,navigateDir }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.contentContainer}
        onClick={() => navigateDir ? navigate(navigateDir) : undefined}
    
        >
            <div className={styles.contentParent}>
                <div>
                    <div className={`${styles.imageContainer} ${alignLeft ? styles.leftAlign : ''}`}>
                        <Icon sx={{ fontSize: 100, transform: 'scale(0.9)' }} />
                    </div>
                    <div className={styles.titleText}>{title}</div>
                    <div className={styles.descriptionText}>{description}</div>

                </div>

            </div>
        </div>
    )
}
export default ProjectBox