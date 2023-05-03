import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import Companies from "../component/Domain/Companies";
import Users from "../component/Domain/Users";
import CompanyForm from "../component/Forms/CompanyForm";
import UserForm from "../component/Forms/UserForm";
import {Grid} from "@material-ui/core";
import {useState} from "react";

export default function Home() {
  const [selectedDomain, setSelectedDomain] = useState("Users");
  const [editFormData, setEditFormData] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [data, setData] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState();

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
            setPageNumber={setPageNumber}
          />
        </Grid>
        <Grid item md={9}>
          {selectedDomain == "Companies" && (
            <>
              <CompanyForm
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
                isFilter={isFilter}
                setIsFilter={setIsFilter}
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
                isFilter={isFilter}
                setIsFilter={setIsFilter}
                data={data}
                filterQuery={filterQuery}
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
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
                isFilter={isFilter}
                setIsFilter={setIsFilter}
                setData={setData}
                selectedDomain={selectedDomain}
                action={action}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                setEditFormData={setEditFormData}
                editFormData={editFormData}
                open={open}
                handleClose={handleClose}
              />
              <Users
                isFilter={isFilter}
                setIsFilter={setIsFilter}
                setAction={setAction}
                filterQuery={filterQuery}
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
