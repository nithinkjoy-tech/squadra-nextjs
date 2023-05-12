import React, {useEffect} from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import CustomTextField from "../CustomTextField";
import useMutateHook from "../../hooks/useMutateHook";
import addCompany from "../../api/companies/addCompany";
import editCompany from "../../api/companies/editCompany";
import * as Yup from "yup";
import {Button, Box, Typography, FormHelperText} from "@mui/material";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

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
  setPageNumber,
}) {
  const initialCompanyData = {
    companyName: "",
    companyEmail: "",
    validTill: null,
    organizationName: "",
    companyId: "",
  };

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
    defaultValues: initialCompanyData,
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

  const mutation = useMutateHook(
    action == "Add"
      ? addCompany(setError, reset, handleClose)
      : editCompany(
          setError,
          reset,
          handleClose,
          setEditFormData,
          initialCompanyData
        )
  );

  const submit = async data => {
    data.validTill = dayjs(data.validTill).format("YYYY-MM-DD");
    if (action == "Add") {
      setIsFilter(false);
      setFilterQuery();
      setPageNumber(1);
      clearErrors();
      mutation.mutate(data);
    }

    if (action == "Edit") {
      clearErrors();
      mutation.mutate(data);
    }

    if (action == "Filter") {
      setIsFilter(true);
      setFilterQuery(data);
      setPageNumber(1);
      handleClose();
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
                  {`${action} Company`}
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
                      setEditFormData(initialCompanyData);
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
