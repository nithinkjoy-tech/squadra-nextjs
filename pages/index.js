import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import MainContent from "../component/MainContent";
import CompanyForm from "../component/Forms/CompanyForm";
import UserForm from "../component/Forms/UserForm";
import RoleForm from "../component/Forms/RoleForm";
import {Grid} from "@material-ui/core";
import {useState} from "react";

export default function Home() {
  const [selectedDomain, setSelectedDomain] = useState("Companies");
  const [editFormData, setEditFormData] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formProps = {
    filterQuery,
    setFilterQuery,
    isFilter,
    setIsFilter,
    setPageNumber,
    pageNumber,
    setData,
    selectedDomain,
    action,
    editFormData,
    setEditFormData,
    open,
    handleClose,
  };

  let mainContentProps = {
    isFilter,
    setIsFilter,
    setAction,
    filterQuery,
    data,
    setData,
    open,
    handleOpen,
    handleClose,
    pageNumber,
    setPageNumber,
    selectedDomain,
    setEditFormData,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={2}>
          <Sidebar
            setFilterQuery={setFilterQuery}
            setIsFilter={setIsFilter}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            setPageNumber={setPageNumber}
          />
        </Grid>
        <Grid item md={9}>
          <>
            {selectedDomain == "Users" && <UserForm {...formProps} />}
            {selectedDomain == "Roles" && <RoleForm {...formProps} />}
            {selectedDomain == "Companies" && <CompanyForm {...formProps} />}
            <MainContent {...mainContentProps} />
          </>
        </Grid>
      </Grid>
    </>
  );
}
