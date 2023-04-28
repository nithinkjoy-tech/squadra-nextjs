import React from "react";
import {useEffect} from "react";
import Header from "../Header";
import CompanyTable from "../Table/CompanyTable";
import Pagination from "../Pagination/Pagination";
import {ConfirmProvider} from "material-ui-confirm";
import {getCompany} from "../../api/getCompany";

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
  setPageNumber,
}) => {
  const fetchData = async () => {
    const data = await getCompany(pageNumber);
    setData(data);
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
      <Pagination count={data.totalPages} setPageNumber={setPageNumber} />
    </React.Fragment>
  );
};

export default Companies;
