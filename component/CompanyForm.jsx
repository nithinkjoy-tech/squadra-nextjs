import React, {useState,useEffect} from "react";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {displayNotification} from "../services/notificationService";
import {addCompany} from "../api/addCompany"
import {getCompany} from "../api/getCompany"
import {editCompany} from "../api/editCompany"
import {filterCompany} from "../api/filterCompany"

const schema = Yup.object().shape({
  companyName: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/\w+[\s\w]*\w+/g, "Invalid Company Name")
    .label("Name"),
  companyEmail: Yup.string()
    .required()
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Should be a valid email"
    )
    .label("Company Email"),
  validTill: Yup.string().required().label("Date"),
  organizationName: Yup.string()
    .required()
    .min(3, "Minimum 3 Characters required")
    .label("Organization Name"),
  companyId: Yup.string()
    .required()
    .matches(/^[A-Za-z]{3}[0-9]{3}$/, "First 3 characters should be alphabet and next 3 should be number")
    .label("Company ID"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "7px",
  p: 4,
};

export default function CompanyForm({
  open,
  handleClose,
  editFormData,
  selectedDomain,
  action,
  setData,
  pageNumber,
  setPageNumber
}) {
  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    resolver: action == "Filter" ? "" : yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      companyEmail: "",
      validTill: "",
      organizationName: "",
      companyId: "",
    },
  });

  useEffect(()=>{
    if(action=="Add"){
      reset()
    }
    if(editFormData){
      setValue(
        "validTill",
        dayjs(new Date(editFormData.validTill)),
        true
      );
      reset(editFormData)
    }
  },[editFormData])

  const fetchData=async()=>{
    const data = await getCompany(pageNumber);
    setData(data)
  }

  const submit = async(data) => {
    data.validTill = dayjs(data.validTill).format('YYYY-MM-DD');
    if(action=="Add"){
      try{
        const response=await addCompany(data)
        console.log(response)
        if(response.status=="200"){
          displayNotification("info", "Successfully Added");
          fetchData()
          handleClose()
        }else{
          displayNotification("error", "Something went Wrong");
        }
      }catch(err){
        displayNotification("error", "Something went Wrong");
      }
    }

    if(action=="Edit"){
      const response=await editCompany(data.id,data)
      if(response.status=="200"){
        displayNotification("info", "Successfully Edited");
        fetchData()
        handleClose()
      }else{
        displayNotification("error", "Something went Wrong");
      }
   }

   if(action=="Filter"){
    const response=await filterCompany(data)
    setData(response.data)
    handleClose()
 }

  };

  const inputBoxStyles = {
    backgroundColor: "#F0EFFF",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
                {selectedDomain == "Companies" &&
                  `${action} Company`}
                {selectedDomain == "Users" &&
                  `${action} Users`}
              </Typography>
              <div>
                {action === "Filter" && (
                  <Button
                    variant="outlined"
                    onClick={() => reset()}
                  >
                    Clear
                  </Button>
                )}
                <CloseIcon
                  style={{
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                  onClick={() => handleClose()}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <div>
                <InputLabel>Company Name</InputLabel>
                <TextField
                  id="companyName"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("companyName")}
                  error={errors.companyName ? true : false}
                />
                {errors.companyName && (
                  <FormHelperText
                    error={true}
                    id="outlined-weight-helper-text"
                  >
                    {errors?.companyName?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Company&apos;s Email ID</InputLabel>
                <TextField
                  id="companyEmail"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("companyEmail")}
                  error={errors.companyEmail ? true : false}
                />
                {errors.companyEmail && (
                  <FormHelperText
                    error={true}
                    id="outlined-weight-helper-text"
                  >
                    {errors?.companyEmail?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Valid Till</InputLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker       
                    onChange={date => {
                      setValue(
                        "validTill",
                        new Date(date),
                        true
                      );
                      clearErrors("validTill");
                    }}
                    defaultValue={
                      dayjs(new Date(getValues("validTill")))
                    }
                    disablePast={true}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>

                {errors.validTill && (
                  <FormHelperText
                    error={true}
                    id="outlined-weight-helper-text"
                  >
                    {errors?.validTill?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Organisation Name</InputLabel>
                <TextField
                  id="organizationName"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("organizationName")}
                  error={
                    errors.organizationName ? true : false
                  }
                />
                {errors.organizationName && (
                  <FormHelperText
                    error={true}
                    id="outlined-weight-helper-text"
                  >
                    {errors?.organizationName?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <InputLabel>Company ID</InputLabel>
                <TextField
                  id="companyId"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("companyId")}
                  error={errors.companyId ? true : false}
                />
                {errors.companyId && (
                  <FormHelperText
                    error={true}
                    id="outlined-weight-helper-text"
                  >
                    {errors?.companyId?.message}
                  </FormHelperText>
                )}
              </div>
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{marginTop: "1rem"}}
            >
              {action == "Add" && `ADD`}
              {action == "Edit" && `Update`}
              {action == "Filter" && `Continue`}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
