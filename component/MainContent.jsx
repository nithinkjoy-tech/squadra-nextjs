import React from "react";
import Header from "./Header";
import DataTable from "./Table/DataTable";
import Pagination from "./Pagination/Pagination";
import useQueryHook from "../hooks/useQueryHook";
import getUser from "../api/getUser";
import getFilteredUser from "../api/getFilteredUser";
import getCompany from "../api/getCompany";
import getFilteredCompany from "../api/getFilteredCompany";
import {ConfirmProvider} from "material-ui-confirm";
import {displayNotification} from "../services/notificationService";

const MainContent = ({
  selectedDomain,
  open,
  handleOpen,
  isFilter,
  setIsFilter,
  filterQuery,
  handleClose,
  setEditFormData,
  setAction,
  data,
  setData,
  pageNumber,
  setPageNumber,
}) => {
  const getFilterAPICall = (filterQuery, pageNumber) => {
    if (selectedDomain == "Companies")
      return getFilteredCompany(filterQuery, pageNumber);
    if (selectedDomain == "Users")
      return getFilteredUser(filterQuery, pageNumber);
  };

  const getAPICall = pageNumber => {
    if (selectedDomain == "Companies") return getCompany(pageNumber);
    if (selectedDomain == "Users") return getUser(pageNumber);
  };

  let {
    data: companyData,
    isLoading,
    error,
  } = useQueryHook(
    isFilter
      ? getFilterAPICall(filterQuery, pageNumber)
      : getAPICall(pageNumber)
  );

  if (isLoading) return "Loading";
  if (error) return displayNotification("error", "Could not fetch data");
  setData(companyData);

  return (
    <React.Fragment>
      <Header
        setAction={setAction}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        selectedDomain={selectedDomain}
      />
      <ConfirmProvider>
        <DataTable
          isFilter={isFilter}
          setIsFilter={setIsFilter}
          setAction={setAction}
          setData={setData}
          data={data}
          open={open}
          pageNumber={pageNumber}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setEditFormData={setEditFormData}
          selectedDomain={selectedDomain}
        />
      </ConfirmProvider>
      {data?.totalPages > 1 && (
        <Pagination
          count={data.totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </React.Fragment>
  );
};

export default MainContent;
