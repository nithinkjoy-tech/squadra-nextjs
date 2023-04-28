import React,{useState} from "react";
import Modal from "@mui/material/Modal";
import {TextField, Button, Box,Typography,FormHelperText} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Name"),
  lastName: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Name"),
  companyEmail: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Should be a valid email")
    .label("Company Email"),
  validTill: Yup.string()
    .required()
    .label("Date"),
  organizationName: Yup.string()
    .required()
    .min(3,"Minimum 3 Characters required")
    .label("Organization Name"),
  companyId: Yup.string()
    .required()
    .min(6,"Minimum 6 Alpha numeric characters")
    .label("Company ID")
});

// let [defaultDate,setDefaultDate]=useState("")

const handleDateChange=(date,m)=>{
  let newDate=new Date(date)
  
  console.log(date,"dtt")
  // console.log(new Date(date),"dtt")
}

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

export default function CompanyForm({open,handleClose,editFormData,selectedDomain,action,filter=false}) {
  const [date, setDate] = useState(dayjs('2022-04-17'));
  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue,
    getValues,
    clearErrors,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues:editFormData||{
        firstName : "",
      lastName : "",
      validTill : "",
      organizationName: "",
      companyId : ""
  }
  });

  const submit = data => {
    data.validTill=dayjs(data.validTill).format('DD/MM/YYYY')
    console.log(data);
  };

  const inputBoxStyles = {
    backgroundColor:"#F0EFFF"
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
          <div style={{
              display:"flex",
              justifyContent:"space-between"
              }}>
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
          {selectedDomain=="Companies"&&`${action} Company`}
          {selectedDomain=="Users"&&`${action} Users`}
        </Typography>
        <div>
          {action==="Filter"&&<Button variant="outlined" onClick={()=>reset()}>Clear</Button>}
          <CloseIcon style={{cursor:"pointer",marginLeft:"0.5rem"}} onClick={()=>handleClose()}/></div>
              </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "10px"
              }}
            >
              <div>
              <InputLabel>First Name</InputLabel>
              <TextField
                id="firstName"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("firstName")}
                error={errors.firstName ? true : false}
              />
              {errors.firstName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.firstName?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Company&aposs Email ID</InputLabel>
              <TextField
                id="companyEmail"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("companyEmail")}
                error={errors.companyEmail ? true : false}
              />
              {errors.companyEmail&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.companyEmail?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Valid Till</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={dayjs(getValues("validTill"))}
        onChange={(date)=>{
          setValue("validTill",(new Date(date)),true);
          clearErrors("validTill")
        }}
        disablePast={true}
        // renderInput={(params) => <TextField {...params} />}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
    </LocalizationProvider> */}
              {errors.validTill&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.validTill?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Organisation Name</InputLabel>
              <TextField
                id="organizationName"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("organizationName")}
                error={errors.organizationName ? true : false}
              />
              {errors.organizationName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.organizationName?.message}</FormHelperText>}
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
              {errors.companyId&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.companyId?.message}</FormHelperText>}
              </div>
              {/* <TextField
                id="companyEmail"
                label="Company's Email ID"
                fullWidth
                margin="dense"
                sx={errors?.companyEmail ? {} : inputBoxStyles}
                helperText={errors?.companyEmail?.message}
                {...register("companyEmail")}
                error={errors.companyEmail ? true : false}
              />

              <TextField
                id="email"
                label="Email"
                fullWidth
                margin="dense"
                sx={errors?.name ? {} : inputBoxStyles}
                helperText={errors?.email?.message}
                {...register("email")}
                error={errors.email ? true : false}
              />
              <TextField
                id="age"
                label="Age"
                fullWidth
                margin="dense"
                sx={errors?.age ? {} : inputBoxStyles}
                helperText={errors?.age?.message}
                {...register("age")}
                error={errors.age ? true : false}
              />
              <TextField
                id="phone"
                label="Phone"
                fullWidth
                margin="dense"
                sx={errors?.phone ? {} : inputBoxStyles}
                helperText={errors?.phone?.message}
                {...register("phone")}
                error={errors.phone ? true : false}
              />

              <TextField
                id="address"
                label="Address"
                fullWidth
                margin="dense"
                sx={errors?.address ? {} : inputBoxStyles}
                helperText={errors?.address?.message}
                {...register("address")}
                error={errors.address ? true : false}
              /> */}
            </div>
              <Button
                variant="contained"
                type="submit"
                sx={{marginTop:"1rem"}}
              >
                {action=="Add"&&`ADD`}
                {action=="Edit"&&`Update`}
                {action=="Filter"&&`Continue`}
              </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
