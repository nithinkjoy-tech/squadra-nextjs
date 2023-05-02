import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useConfirm} from "material-ui-confirm";
import {deleteCompany} from "../../api/deleteCompany";
import {displayNotification} from "../../services/notificationService";
import {getCompany} from "../../api/getCompany";
import {filterCompany} from "../../api/filterCompany";
import Divider from '@mui/material/Divider';

export default function BasicTable({
  handleOpen,
  setEditFormData,
  setAction,
  isFilter,
  pageNumber,
  filterData,
  setData,
  data,
}) {
  const fetchData = async () => {
    try {
      const data = await getCompany(pageNumber);
      setData(data);
    } catch (err) {
      displayNotification("error", "Could not fetch data");
    }
  };

  const confirm = useConfirm();

  const handleDelete = async id => {
    try {
      const response = await deleteCompany(id);
      if (response.status == "200") {
        fetchData();
        return displayNotification("info", "Successfully Deleted");
      }
    } catch (err) {
      displayNotification("error", "Could not delete data");
    }
  };

  const handleConfirm = id => {
    confirm({description: `Are you sure want to delete this company`})
      .then(() => {
        handleDelete(id);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  if(data?.content?.length==0) return <div style={{marginLeft:"10rem"}}>No Data to display</div>;

  return (
    <div style={{marginTop:"1rem"}}>
      <Divider/>
      <TableContainer>
        <Table style={{borderCollapse: "separate",
            borderSpacing: "0px 1rem"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{borderBottom: "none"}}>Company Name</TableCell>
              <TableCell style={{borderBottom: "none"}}>Company Email</TableCell>
              <TableCell style={{borderBottom: "none"}}>Valid Till</TableCell>
              <TableCell style={{borderBottom: "none"}}>Organization Name</TableCell>
              <TableCell style={{borderBottom: "none"}}>Company ID</TableCell>
              <TableCell style={{borderBottom: "none"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map((row, index) => (
              <TableRow sx={{backgroundColor:"#F0EFFF"}} key={index}>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.companyEmail}</TableCell>
                <TableCell>{row.validTill}</TableCell>
                <TableCell>{row.organizationName}</TableCell>
                <TableCell>{row.companyId}</TableCell>
                <TableCell>
                  <EditIcon
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      handleOpen();
                      setEditFormData(row);
                      setAction("Edit");
                    }}
                  />
                  <i
                    style={{
                      margin: "2rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleConfirm(row.id)}
                  >
                    <DeleteIcon />
                  </i>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
