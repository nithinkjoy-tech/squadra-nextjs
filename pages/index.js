import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import Table from "../component/Table/Table";
import Companies from "../component/Domain/Companies";
import Users from "../component/Domain/Users";
import {Grid} from "@material-ui/core";
import {useState} from "react";
import CompanyForm from "../component/CompanyForm";
import UserForm from "../component/UserForm";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const [selectedDomain, setSelectedDomain] =
    useState("Companies");

  const [editFormData,setEditFormData]=useState(null)
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={2}>
          <Sidebar
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
          />
        </Grid>
        <Grid item md={10}>
          {selectedDomain == "Companies" && (
            <>
            <CompanyForm selectedDomain={selectedDomain} action={action} editFormData={editFormData} open={open} handleClose={handleClose} />
            <Companies
            setAction={setAction}
            open={open}
            handleOpen={handleOpen}
              handleClose={handleClose}
              selectedDomain={selectedDomain}
              setEditFormData={setEditFormData}
            />
            </>
          )}
          {selectedDomain == "Users" && (
            <>
              <UserForm selectedDomain={selectedDomain} action={action} editFormData={editFormData} open={open} handleClose={handleClose} />
              <Users setAction={setAction}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              selectedDomain={selectedDomain}
              setEditFormData={setEditFormData} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
