import React from "react";
import Header from "../Header";
import CompanyTable from "../Table/CompanyTable";
import Pagination from "../Pagination/Pagination";
import {useEffect} from "react";
import {ConfirmProvider} from "material-ui-confirm";
import {getCompany} from "../../api/getCompany";
import {filterCompany} from "../../api/filterCompany";
import {displayNotification} from "../../services/notificationService";

const Companies = ({
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
  const fetchData = async () => {
    if(isFilter){
      try {
        const {data} = await filterCompany(filterQuery,pageNumber-1);
        setData(data);
      } catch (err) {
        displayNotification("error", "Could not fetch data");
      }
    }else{
      try {
        const data = await getCompany(pageNumber);
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
      {data.totalPages>1&&<Pagination count={data.totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />}
    </React.Fragment>
  );
};

export default Companies;
