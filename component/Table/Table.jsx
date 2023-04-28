import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import {deleteCompany} from "../../api/deleteCompany"
import {displayNotification} from "../../services/notificationService"

export default function BasicTable({
  selectedDomain,
  setPageNumber,
  handleOpen,
  handleClose,
  setEditFormData,
  setAction,
  data
}) {

  const confirm = useConfirm();

  const handleDelete=async(id)=>{
    const response=await deleteCompany(id)
    console.log(response)
    if(response.status=="200"){
      return displayNotification("info","Successfully Deleted")
    }
  }

  const handleConfirm = (id) => {
    console.log(id,"iiid")
    confirm({ description: `Are you sure want to delete this company` })
      .then(() => {
        handleDelete(id)
      })
      .catch(() => console.log("Deletion cancelled."));
  }
  console.log(data,"fdata")

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{minWidth: 650, margin: "10px"}}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">
                Fat&nbsp;(g)
              </TableCell>
              <TableCell align="right">
                Carbs&nbsp;(g)
              </TableCell>
              <TableCell align="right">
                Protein&nbsp;(g)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{margin: "14px"}}>
            {data?.content?.map(row => (
              <TableRow
                key={row.companyName}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell
                  sx={{margin: "14px"}}
                  component="th"
                  scope="row"
                >
                  {row.companyEmail}
                </TableCell>
                <TableCell align="right">
                  {row.validTill}
                </TableCell>
                <TableCell align="right">
                  {row.organizationName}
                </TableCell>
                <TableCell align="right">
                  {row.companyId}
                </TableCell>
                <TableCell align="right">
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
      {/* <span>Page no:4</span>
      <Pagination setPageNumber={setPageNumber} /> */}
    </div>
  );
}
