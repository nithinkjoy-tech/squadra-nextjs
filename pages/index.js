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
import Modal from "../component/Modal";
import Form from "../component/CompanyForm";
import Pagination from "../component/Pagination/Pagination";

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
          {/* <Modal handleClose={handleClose} open={open}> */}
          <Form selectedDomain={selectedDomain} action={action} editFormData={editFormData} open={open} handleClose={handleClose} />
          {/* </Modal> */}
          {selectedDomain == "Companies" && (
            <Companies
            setAction={setAction}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              selectedDomain={selectedDomain}
              setEditFormData={setEditFormData}
            />
          )}
          {selectedDomain == "Users" && (
            <Users selectedDomain={selectedDomain} />
          )}
          {/* <Table selectedDomain={selectedDomain}/> */}
          {/* <Pagination/> */}
        </Grid>
      </Grid>
    </>
  );
}
