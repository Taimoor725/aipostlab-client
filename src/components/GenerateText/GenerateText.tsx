import React from "react";
import styles from './GenerateText.module.css'
import GenerateTextForm from "../utils/GeneratedTextForm/GeneratedTextForm";
import GenerateTextTemplate from "../utils/GenerateTextTemplate/GenerateTextTemplate";


const GenerateText: React.FC = () => {

    return (
        <div className={styles.contentContainer}>
            <div className={styles.parentDiv}>
                <div className={styles.childDiv}>
                    <GenerateTextForm/>
                </div>
                <div className={styles.childDiv}>
                    <GenerateTextTemplate/>
                </div>

            </div>


        </div>
    )
};

export default GenerateText