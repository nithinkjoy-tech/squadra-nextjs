import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import Companies from "../component/Domain/Companies";
import Users from "../component/Domain/Users";
import CompanyForm from "../component/CompanyForm";
import UserForm from "../component/UserForm";
import {Grid} from "@material-ui/core";
import {useState} from "react";

export default function Home() {
  const [selectedDomain, setSelectedDomain] = useState("Companies");
  const [editFormData, setEditFormData] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [data, setData] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

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
              <CompanyForm
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                setData={setData}
                selectedDomain={selectedDomain}
                action={action}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                open={open}
                handleClose={handleClose}
              />
              <Companies
                data={data}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                setData={setData}
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
              <UserForm
                setData={setData}
                selectedDomain={selectedDomain}
                action={action}
                setEditFormData={setEditFormData}
                editFormData={editFormData}
                open={open}
                handleClose={handleClose}
              />
              <Users
                setAction={setAction}
                data={data}
                setData={setData}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                selectedDomain={selectedDomain}
                setEditFormData={setEditFormData}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
