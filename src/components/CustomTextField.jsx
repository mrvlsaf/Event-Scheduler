import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({ label, value, onChange, ...props }) => {
    return (
        <div style={{ display: "flex", marginBottom: 16 }}>
            <label style={{ width: "30%" }}>{label}:</label>
            <TextField
                variant="outlined"
                fullWidth
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default CustomTextField;