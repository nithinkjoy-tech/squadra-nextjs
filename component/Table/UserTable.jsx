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
import {deleteUser} from "../../api/deleteUser";
import {displayNotification} from "../../services/notificationService";
import {getUser} from "../../api/getUser";

export default function BasicTable({
  handleOpen,
  setEditFormData,
  setAction,
  pageNumber,
  setData,
  data,
}) {
  const fetchData = async () => {
    try {
      const data = await getUser(pageNumber);
      setData(data);
    } catch (err) {
      displayNotification("error", "Could not fetch data");
    }
  };

  const confirm = useConfirm();

  const handleDelete = async id => {
    try {
      const response = await deleteUser(id);
      if (response.status >= "200" || response.status < "300") {
        fetchData();
        return displayNotification("info", "Successfully Deleted");
      }
    } catch (err) {
      displayNotification("error", "Could not delete");
    }
  };

  const handleConfirm = id => {
    confirm({description: `Are you sure want to delete this User`})
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
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>User State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.user?.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{margin: "14px"}} component="th" scope="row">
                  {row.first_name + " " + row.last_name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.user_state ? "Active" : "Inactive"}</TableCell>
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
                    onClick={() => handleConfirm(row.userId)}
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
