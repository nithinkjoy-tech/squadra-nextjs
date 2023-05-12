import React, {useEffect} from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import CustomTextField from "../CustomTextField";
import useMutateHook from "../../hooks/useMutateHook";
import addRole from "../../api/roles/addRole";
import editRole from "../../api/roles/editRole";
import * as Yup from "yup";
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
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const schema = Yup.object().shape({
  roleName: Yup.string()
    .oneOf(["Admin", "Manager"])
    .required()
    .label("Role Name"),
  organizationName: Yup.string()
    .required()
    .min(3, "Minimum 3 Characters required")
    .label("Organization Name"),
  createdDate: Yup.string().required().label("Created Date"),
  roleState: Yup.string()
    .oneOf(["Active", "Inactive"])
    .required()
    .label("Role State"),
  roleId: Yup.string()
    .required()
    .matches(
      /^[A-Z]{3}[0-9]{3}$/,
      "First 3 characters should be uppercase alphabet and next 3 should be number"
    )
    .label("Role ID"),
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

export default function RoleForm({
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
  const initialRoleData = {
    roleName: "",
    organizationName: "",
    createdDate: null,
    roleState: "",
    roleId: "",
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
    defaultValues: initialRoleData,
  });

  useEffect(() => {
    if (action == "Add") {
      reset();
    }
    if (editFormData) {
      setValue("createdDate", dayjs(new Date(editFormData.createdDate)), true);
      reset(editFormData);
    }
  }, [editFormData]);

  const mutation = useMutateHook(
    action == "Add"
      ? addRole(setError, reset, handleClose)
      : editRole(setError, reset, handleClose, setEditFormData, initialRoleData)
  );

  const submit = async data => {
    data.createdDate = dayjs(data.createdDate).format("YYYY-MM-DD");
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
    return action == "Edit" && getValues("createdDate")
      ? dayjs(new Date(getValues("createdDate")))
      : action == "Filter" && getValues("createdDate")
      ? dayjs(new Date(getValues("createdDate")))
      : "";
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
                  {`${action} Role`}
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
                      setEditFormData(initialRoleData);
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
                <div>
                  <InputLabel>Role Name</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={getValues("roleName")}
                    onChange={event => {
                      setValue("roleName", event.target.value, true);
                      clearErrors("roleName");
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
                  {errors.roleName && (
                    <FormHelperText
                      error={true}
                      id="outlined-weight-helper-text"
                    >
                      {errors?.roleName?.message}
                    </FormHelperText>
                  )}
                </div>
                <CustomTextField
                  label="Organisation Name"
                  name="organizationName"
                  errors={errors}
                />
                <div>
                  <InputLabel>Created Date</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={date => {
                        setValue("createdDate", new Date(date), true);
                        clearErrors("createdDate");
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
                  {errors.createdDate && (
                    <FormHelperText
                      error={true}
                      id="outlined-weight-helper-text"
                    >
                      {errors?.createdDate?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <InputLabel>Role State</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={getValues("roleState")}
                    onChange={event => {
                      setValue("roleState", event.target.value, true);
                      clearErrors("roleState");
                    }}
                    sx={inputBoxStyles}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem key="inactive" value={"Inactive"}>
                      Inactive
                    </MenuItem>
                    <MenuItem key="active" value={"Active"}>
                      Active
                    </MenuItem>
                  </Select>
                  {errors.roleState && (
                    <FormHelperText
                      error={true}
                      id="outlined-weight-helper-text"
                    >
                      {errors?.roleState?.message}
                    </FormHelperText>
                  )}
                </div>
                <CustomTextField
                  label="Role ID"
                  name="roleId"
                  errors={errors}
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
