import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => <TextField fullWidth label={label} required />}
        control={control}
        fullwidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  );
};

export default CustomTextField;
