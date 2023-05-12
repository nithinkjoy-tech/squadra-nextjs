import React, {useEffect} from "react";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import CustomTextField from "../CustomTextField";
import useMutateHook from "../../hooks/useMutateHook";
import addWholesaler from "../../api/wholesalers/addWholesaler";
import editWholesaler from "../../api/wholesalers/editWholesaler";
import {
  Button,
  Box,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {displayNotification} from "../../services/notificationService";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .min(2, "minimum 2 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("First Name"),
  lastName: Yup.string()
    .required()
    .min(1, "minimum 1 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Last Name"),
  email: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, "Should be a valid email")
    .label("Email"),
  phoneNumber: Yup.string()
    .required()
    .matches(/^[6789]\d{9}$/, "Invalid Phone number")
    .label("Phone Number"),
  wholesalerId: Yup.string()
    .required()
    .matches(
      /^[A-Z]{3}[0-9]{3}$/,
      "First 3 characters should be uppercase alphabet and next 3 should be number"
    )
    .label("Wholesaler ID"),
  role: Yup.string().oneOf(["Admin", "Manager"]).required().label("Role"),
  locId: Yup.string()
    .required()
    .matches(
      /^[A-Z]{3}[0-9]{6}$/,
      "First 3 characters should be uppercase alphabet and next 6 should be number"
    )
    .label("LOC ID"),
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

export default function WholesalerForm({
  open,
  handleClose,
  editFormData,
  setEditFormData,
  selectedDomain,
  action,
  setData,
  setFilterQuery,
  setIsFilter,
  setPageNumber,
  pageNumber = 1,
}) {
  const initialWholesalerData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    wholesalerId: "",
    role: "",
    locId: "",
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
    defaultValues: editFormData || initialWholesalerData,
  });

  useEffect(() => {
    if (action == "Add") {
      reset();
    }
    reset(editFormData);
  }, [editFormData, action]);

  const mutation = useMutateHook(
    action == "Add"
      ? addWholesaler(setError, reset, handleClose)
      : editWholesaler(
          setError,
          reset,
          handleClose,
          setEditFormData,
          initialWholesalerData
        )
  );

  const submit = async data => {
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

  const inputBoxStyles = {
    backgroundColor: "#F0EFFF",
    width: "100%",
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
                  {`${action} Wholesaler`}
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
                      setEditFormData(initialWholesalerData);
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
                  label="First Name"
                  name="firstName"
                  errors={errors}
                />
                <CustomTextField
                  label="Last Name"
                  name="lastName"
                  errors={errors}
                />
                <CustomTextField
                  label="Email ID"
                  name="email"
                  errors={errors}
                />
                <CustomTextField
                  label="Phone Number"
                  name="phoneNumber"
                  errors={errors}
                />
                <CustomTextField
                  label="Wholesaler ID"
                  name="wholesalerId"
                  errors={errors}
                  disabled={action == "Edit"}
                />
                {action == "Filter" ? (
                  ""
                ) : (
                  <>
                    <div>
                      <InputLabel>Role</InputLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={getValues("role")}
                        onChange={event => {
                          setValue("role", event.target.value, true);
                          clearErrors("role");
                        }}
                        sx={inputBoxStyles}
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem key="admin" value={"Admin"}>
                          Admin
                        </MenuItem>
                        <MenuItem key="manager" value={"Manager"}>
                          Manager
                        </MenuItem>
                      </Select>
                      {errors.role && (
                        <FormHelperText
                          error={true}
                          id="outlined-weight-helper-text"
                        >
                          {errors?.role?.message}
                        </FormHelperText>
                      )}
                    </div>
                    <CustomTextField
                      label="LOC ID"
                      name="locId"
                      errors={errors}
                    />
                  </>
                )}
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
