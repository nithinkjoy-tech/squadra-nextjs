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

export default function BasicTable({
  handleOpen,
  setEditFormData,
  setAction,
  pageNumber,
  setData,
  data,
}) {
  const fetchData = async () => {
    const data = await getCompany(pageNumber);
    setData(data);
  };

  const confirm = useConfirm();

  const handleDelete = async id => {
    const response = await deleteCompany(id);
    if (response.status == "200") {
      fetchData();
      return displayNotification("info", "Successfully Deleted");
    }
  };

  const handleConfirm = id => {
    confirm({description: `Are you sure want to delete this company`})
      .then(() => {
        handleDelete(id);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Company Email</TableCell>
              <TableCell>Valid Till</TableCell>
              <TableCell>Organization Name</TableCell>
              <TableCell>Company ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map((row,index) => (
              <TableRow
                key={index}
              >
                <TableCell>
                  {row.companyName}
                </TableCell>
                <TableCell>
                  {row.companyEmail}
                </TableCell>
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