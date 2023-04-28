import React,{useState} from "react";
import Modal from "@mui/material/Modal";
import {TextField, Button, Box,Typography,FormHelperText,Select,MenuItem} from "@mui/material";
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
  first_name: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("First Name"),
  last_name: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Last Name"),
  email: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Should be a valid email")
    .label("Company Email"),
  phone: Yup.string()
    .required()
    .matches(/^[789]\d{9}$/,"Invalid Phone number")
    .label("Phone Number"),
company_name: Yup.string()
    .required()
    .min(3,"Minimum 3 Characters required")
    .label("Company Name"),
  user_state: Yup.string()
    .oneOf(['Active', 'Inactive'])
    .required()
    .label("User State"),

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

export default function CompanyForm({open,handleClose,editFormData,selectedDomain,action,}) {
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
    resolver: action=="Filter"?"":yupResolver(schema),
    mode: "onTouched",
    defaultValues:editFormData||{
        first_name : "",
      last_name : "",
      email : "",
      phone: "",
      company_name : "",
      user_state : "",
  }
  });

  const submit = data => {
    // data.validTill=dayjs(data.validTill).format('DD/MM/YYYY')
    console.log(data,"lll");
  };

  const inputBoxStyles = {
    backgroundColor:"#F0EFFF",
    width:"100%"
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
                id="first_name"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("first_name")}
                error={errors.first_name ? true : false}
              />
              {errors.first_name&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.first_name?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Last Name</InputLabel>
              <TextField
                id="last_name"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("last_name")}
                error={errors.last_name ? true : false}
              />
              {errors.last_name&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.last_name?.message}</FormHelperText>}
              </div>

              

              <div>
              <InputLabel>Email ID</InputLabel>
              <TextField
                id="email"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("email")}
                error={errors.email ? true : false}
              />
              {errors.email&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.email?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Phone Number</InputLabel>
              <TextField
                id="phone"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("phone")}
                error={errors.phone ? true : false}
              />
              {errors.phone&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.phone?.message}</FormHelperText>}
              </div>
              <div>
              <InputLabel>User State</InputLabel>
              <Select
            labelId="role-select-label"
            id="role-select"
            onChange={(event)=>{
                setValue("user_state",event.target.value,true);
                clearErrors("user_state")
                // console.log(value,"gggg")
              }}
            sx={inputBoxStyles}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
            <MenuItem value={"Active"}>Active</MenuItem>
          </Select>
          {errors.user_state&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.user_state?.message}</FormHelperText>}
              </div>
              <div>
              <InputLabel>Company Name</InputLabel>
              <TextField
                id="company_name"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("company_name")}
                error={errors.company_name ? true : false}
              />
              {errors.company_name&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.company_name?.message}</FormHelperText>}
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
