import React, { useState } from "react";
import { IconButton, InputBase, Box, Typography, Button, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import styles from './IconPickerCom.module.css'

// Define available icons
const iconsList = [
    { name: "Instagram", Icon: InstagramIcon },
    { name: "LinkedIn", Icon: LinkedInIcon },
    { name: "Facebook", Icon: FacebookIcon },
    { name: "Pinterest", Icon: PinterestIcon },
    { name: "Instagram", Icon: InstagramIcon },
    { name: "LinkedIn", Icon: LinkedInIcon },
    { name: "Facebook", Icon: FacebookIcon },
    { name: "Pinterest", Icon: PinterestIcon },
];

interface IconPickerPopupProps {
    onClose: () => void;
    onSelect: (iconName: string) => void;
}

const IconPickerPopup: React.FC<IconPickerPopupProps> = ({ onClose, onSelect }) => {
    const [search, setSearch] = useState("");

    // Filter icons based on search input
    const filteredIcons = iconsList.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.overlay}>
            <div className={styles.iconPickerModal}>
                <Button className={styles.closeButton} onClick={onClose}>
                    <CloseIcon />
                </Button>

                <Box sx={{ padding: 2 }}>
                    {/* Search Box */}
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        <SearchIcon sx={{ marginRight: 1 }} />
                        <InputBase
                            placeholder="Search icons"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                        />
                    </Box>

                    {/* Icons Grid */}
                    <Grid container spacing={1} columns={4}>
                        {filteredIcons.map((icon, index) => (
                            <Grid item xs={3} sm={2} md={1} key={index}>
                                <IconButton
                                    onClick={() => onSelect(icon.name)}
                                    sx={{
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 48,
                                        height: 48,
                                     
                                    }}
                                >
                                    <icon.Icon fontSize="large" color="inherit" />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default IconPickerPopup;
