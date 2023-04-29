import React from "react";
import Header from "../Header";
import UserTable from "../Table/UserTable";
import Pagination from "../Pagination/Pagination";
import {useEffect} from "react";
import {ConfirmProvider} from "material-ui-confirm";
import {getUser} from "../../api/getUser";
import {displayNotification} from "../../services/notificationService"

const Users = ({
  selectedDomain,
  open,
  handleOpen,
  handleClose,
  setEditFormData,
  setAction,
  data,
  setData,
  pageNumber,
  setPageNumber,
}) => {
  const fetchData = async () => {
    try {
      const data = await getUser(pageNumber);
      setData(data);
    } catch (err) {
      displayNotification("error","Could not fetch data");
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
        <UserTable
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
      <Pagination
        count={Number(data.totalPages) - 1}
        setPageNumber={setPageNumber}
      />
    </React.Fragment>
  );
};

export default Users;
