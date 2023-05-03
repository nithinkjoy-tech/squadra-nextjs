import React from "react";
import Header from "../Header";
import CompanyTable from "../Table/DataTable";
import Pagination from "../Pagination/Pagination";
import {useEffect} from "react";
import {ConfirmProvider} from "material-ui-confirm";
import {getUser} from "../../api/getUser";
import {filterUser} from "../../api/filterUser";
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
  const fetchData = async () => {
    if (isFilter) {
      try {
        const data = await filterUser(filterQuery, pageNumber);
        console.log(data, "filterwith pagination");
        setData(data.data);
      } catch (err) {
        console.log(err, "filterwith pagi error");
        displayNotification("error", "Could not fetch data");
      }
    } else {
      try {
        const data = await getUser(pageNumber);
        setData(data);
      } catch (err) {
        displayNotification("error", "Could not fetch data");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

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
        <CompanyTable
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
      {data.totalPages > 1 && (
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
