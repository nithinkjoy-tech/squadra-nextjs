import React, {useState, useEffect} from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import CustomTextField from "../CustomTextField";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {displayNotification} from "../../services/notificationService";
import {addCompany} from "../../api/addCompany";
import {getCompany} from "../../api/getCompany";
import {editCompany} from "../../api/editCompany";
import {filterCompany} from "../../api/filterCompany";

const schema = Yup.object().shape({
  companyName: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/\w+[\s\w]*\w+/g, "Invalid Company Name")
    .label("Name"),
  companyEmail: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Should be a valid email")
    .label("Company Email"),
  validTill: Yup.string().required().label("Date"),
  organizationName: Yup.string()
    .required()
    .min(3, "Minimum 3 Characters required")
    .label("Organization Name"),
  companyId: Yup.string()
    .required()
    .matches(
      /^[A-Z]{3}[0-9]{3}$/,
      "First 3 characters should be uppercase alphabet and next 3 should be number"
    )
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
  setEditFormData,
  selectedDomain,
  setFilterQuery,
  setIsFilter,
  action,
  setData,
  pageNumber,
  setPageNumber,
}) {
  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue,
    getValues,
    clearErrors,
    reset,
    setError,
  } = useForm({
    resolver: action == "Filter" ? "" : yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      companyEmail: "",
      validTill: null,
      organizationName: "",
      companyId: "",
    },
  });

  useEffect(() => {
    if (action == "Add") {
      reset();
    }
    if (editFormData) {
      setValue("validTill", dayjs(new Date(editFormData.validTill)), true);
      reset(editFormData);
    }
  }, [editFormData]);

  const fetchData = async () => {
    try {
      const data = await getCompany(pageNumber);
      setData(data);
    } catch (err) {
      displayNotification("error", "Could not fetch data");
    }
  };

  const submit = async data => {
    data.validTill = dayjs(data.validTill).format("YYYY-MM-DD");
    if (action == "Add") {
      try {
        setIsFilter(false);
        setFilterQuery();
        setPageNumber(1);
        clearErrors();
        const response = await addCompany(data);
        if (response.status >= "200" || response.status <= "300") {
          displayNotification("info", "Successfully Added");
          fetchData();
          reset();
          handleClose();
        } else {
          displayNotification("error", "Could not add company to database");
        }
      } catch (err) {
        if (err.response.status == "409") {
          setError(err.response.data.property, {
            type: "custom",
            message: err.response.data.message,
          });
        } else {
          displayNotification("error", "Could not edit user data");
        }
      }
    }

    if (action == "Edit") {
      try {
        clearErrors();
        const response = await editCompany(data.id, data);
        if (response.status >= "200" || response.status <= "300") {
          displayNotification("info", "Successfully Edited");
          fetchData();
          setEditFormData({
            companyName: "",
            companyEmail: "",
            validTill: null,
            organizationName: "",
            companyId: "",
          });
          handleClose();
        }
      } catch (err) {
        if (err.response.status == "409") {
          setError(err.response.data.property, {
            type: "custom",
            message: err.response.data.message,
          });
        } else {
          displayNotification("error", "Could not edit user data");
        }
      }
    }

    if (action == "Filter") {
      try {
        setIsFilter(true);
        setFilterQuery(data);
        setPageNumber(1);
        const response = await filterCompany(data);
        setData(response.data);
        handleClose();
      } catch (err) {
        displayNotification("error", "Could not apply filter");
      }
    }
  };

  const getDate = () => {
    return action == "Edit" && getValues("validTill")
      ? dayjs(new Date(getValues("validTill")))
      : action == "Filter" && getValues("validTill")
      ? dayjs(new Date(getValues("validTill")))
      : "";
  };

  const inputBoxStyles = {
    backgroundColor: "#F0EFFF",
  };

  return (
    <FormProvider register={register}>
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
                  {selectedDomain == "Companies" && `${action} Company`}
                  {selectedDomain == "Users" && `${action} Users`}
                </Typography>
                <div>
                  {action === "Filter" && (
                    <Button variant="outlined" onClick={() => reset()}>
                      Clear
                    </Button>
                  )}
                  <CloseIcon
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                    }}
                    onClick={() => {
                      setEditFormData({
                        companyName: "",
                        companyEmail: "",
                        validTill: null,
                        organizationName: "",
                        companyId: "",
                      });
                      handleClose();
                    }}
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
                <CustomTextField
                  label="Company Name"
                  name="companyName"
                  errors={errors}
                />
                <CustomTextField
                  label="Company's Email ID"
                  name="companyEmail"
                  errors={errors}
                />
                <div>
                  <InputLabel>Valid Till</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={date => {
                        setValue("validTill", new Date(date), true);
                        clearErrors("validTill");
                      }}
                      sx={inputBoxStyles}
                      value={getDate()}
                      defaultValue={getDate()}
                      disablePast={true}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
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
                <CustomTextField
                  label="Organisation Name"
                  name="organizationName"
                  errors={errors}
                />
                <CustomTextField
                  label="Company ID"
                  name="companyId"
                  errors={errors}
                  disabled={action == "Edit"}
                />
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
    </FormProvider>
  );
}
