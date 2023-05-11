import React from "react";
import Header from "../Header";
import DataTable from "../Table/DataTable";
import Pagination from "../Pagination/Pagination";
import useQueryHook from "../../hooks/useQueryHook";
import getUser from "../../api/getUser";
import getFilteredUser from "../../api/getFilteredUser";
import {ConfirmProvider} from "material-ui-confirm";
import {displayNotification} from "../../services/notificationService";

const Users = ({
  selectedDomain,
  open,
  handleOpen,
  handleClose,
  isFilter,
  setIsFilter,
  filterQuery,
  setEditFormData,
  setAction,
  data,
  setData,
  pageNumber,
  setPageNumber,
}) => {
  let {
    data: userData,
    isLoading,
    error,
  } = useQueryHook(
    isFilter
      ? getFilteredUser(filterQuery, pageNumber)
      : getUser(pageNumber)
  );

  if (isLoading) return "Loading";
  if (error) return displayNotification("error", "Could not fetch data");
  setData(userData);

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
          data={data}
          setData={setData}
          setAction={setAction}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setEditFormData={setEditFormData}
          selectedDomain={selectedDomain}
        />
      </ConfirmProvider>
      {data?.totalPages > 1 && (
        <Pagination
          count={Number(data.totalPages) - 1}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </React.Fragment>
  );
};

export default Users;
