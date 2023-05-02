import React from "react";
import InputLabel from "@mui/material/InputLabel";
import {TextField, FormHelperText} from "@mui/material";
import {useFormContext } from "react-hook-form";

const inputBoxStyles = {
    backgroundColor: "#F0EFFF",
  };

  
  const CustomTextField = ({label,name,errors,...props}) => {
    const { register } = useFormContext();
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <TextField
        id={name}
        fullWidth
        sx={inputBoxStyles}
        placeholder=""
        {...props}
        {...register(name)}
        error={errors[name] ? true : false}
      />
      {errors[name] && (
        <FormHelperText error={true} id="outlined-weight-helper-text">
          {errors[name].message}
        </FormHelperText>
      )}
    </div>
  );
};

export default CustomTextField;
