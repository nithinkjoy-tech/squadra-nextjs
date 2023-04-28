import React from "react";
import {useState,useEffect} from "react";
import Header from "../Header";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import {ConfirmProvider} from "material-ui-confirm";
import getCompany from "../../api/getCompany"
import {displayNotification} from "../../services/notificationService"

const Companies = ({
  selectedDomain,
  open,
  handleOpen,
  handleClose,
  setEditFormData,
  setAction,
  data,
  setData,
  pageNumber,
  setPageNumber
}) => {
  

  const fetchData=async()=>{
    const data = await getCompany(pageNumber);
    console.log(data,"jjj")
    setData(data)
  }

  useEffect(()=>{
    fetchData()
  },[pageNumber])
  // if (isLoading) return <h1>Loading...</h1>;
  // if (error) return displayNotification("error","Network Error");
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
        <Table
          setAction={setAction}
          data={data}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setEditFormData={setEditFormData}
          selectedDomain={selectedDomain}
        />
      </ConfirmProvider>
      <Pagination
        count={data.totalPages}
        setPageNumber={setPageNumber}
      />
    </React.Fragment>
  );
};

export default Companies;
