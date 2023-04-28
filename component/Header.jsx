import React from "react";
import {Typography, Button, Grid} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function Header({
  selectedDomain,
  handleOpen,
  setAction,
}) {
  return (
    <Grid container sx={{margin: 5}}>
      <Grid item xs={8}>
        <Typography
          variant="subtitle1"
          sx={{
            fontfamily: "Montserrat",
            fontstyle: "normal",
            fontweight: 600,
            fontsize: 10,
            color: "blue",
          }}
        >
          {selectedDomain}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{width: 82, height: 36}}
              onClick={() => {
                handleOpen();
                setAction("Add");
              }}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: 82,
                height: 36,
                fontweight: 400,
                fontsize: 15,
              }}
              onClick={() => {
                handleOpen();
                setAction("Filter");
              }}
            >
              <FilterAltIcon />
              Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
