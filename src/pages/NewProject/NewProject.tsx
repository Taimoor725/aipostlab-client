import React, { useEffect } from "react";
import styles from "./NewProject.module.css";
import ProjectBox from "../../components/utils/ProjectBox/ProjectBox";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import ProjectTitle from "../../components/ProjectTitle/ProjectTitle";
import { getGeneratedProjectList } from "../../api/project";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const NewProject: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [error, setError] = React.useState("");

  const brand = useSelector((state: RootState) =>
    typeof state.brand.selectedBrand === "string"
      ? { id: state.brand.selectedBrand }
      : state.brand.selectedBrand || { id: "" }
  );

  useEffect(() => {
    const getProjects = async () => {
      // fetch projects
      try {
        const response = await getGeneratedProjectList(brand.id);

        if (response.ok) {
          const projects = await response.json();
          setProjects([
            ...projects.socialMediaProjects.$values,
            ...projects.productProjects.$values,
          ]);
        }
      } catch (error) {
        setError("Failed to fetch projects");
      }
    };

    getProjects();
    console.log(projects);
  }, [brand]);

  return (
    <div className={styles.contentContainer}>
      <ProjectTitle
        title={t("NewProject.projectListTitle")}
        subtitle={t("NewProject.projectListSubtitle")}
        Icon={DisplaySettingsOutlinedIcon}
      />
      <ProjectBox
        title={t("NewProject.createProjectTitle")}
        description={t("NewProject.createProjectDescription")}
        Icon={CreateNewFolderOutlinedIcon}
        navigateDir="/asset-selection"
      />
      <div className={styles.projectGridContainer}>
        {projects.map((project: any) => (
          <ProjectBox
            title={project.id}
            description={project.projectName}
            Icon={CreateNewFolderOutlinedIcon}
            navigateDir={
              !project.headline
                ? `/product-creative/${project.projectId}`
                : `/project/${project.id}`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default NewProject;
