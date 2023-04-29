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
import {deleteUser} from "../../api/deleteUser";
import {displayNotification} from "../../services/notificationService";
import {getCompany} from "../../api/getCompany";
import {getUser} from "../../api/getUser";

export default function BasicTable({
  handleOpen,
  setEditFormData,
  setAction,
  pageNumber,
  setData,
  data,
}) {
  console.log(data, "dtt");
  const fetchData = async () => {
    const data = await getUser(pageNumber);
    setData(data);
  };

  const confirm = useConfirm();

  const handleDelete = async id => {
    console.log(id, "id");
    try {
      const response = await deleteUser(id);
      if (response.status >= "200" || response.status < "300") {
        fetchData();
        return displayNotification("info", "Successfully Deleted");
      }
    } catch (err) {
      console.log(err, "err");
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
          // sx={{minWidth: 650, margin: "10px"}}
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
            {data?.user?.map((row,index) => (
              <TableRow
                key={index}
              >
                <TableCell sx={{margin: "14px"}} component="th" scope="row">
                  {row.last_name+" "+row.last_name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.user_state?"Active":"Inactive"}</TableCell>
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
