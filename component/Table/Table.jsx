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
import { useConfirm } from "material-ui-confirm";
import {deleteCompany} from "../../api/deleteCompany"
import {displayNotification} from "../../services/notificationService"
import {getCompany} from "../../api/getCompany"

export default function BasicTable({
  handleOpen,
  setEditFormData,
  setAction,
  pageNumber,
  setData,
  data
}) {


  const fetchData=async()=>{
    const data = await getCompany(pageNumber);
    setData(data)
  }

  const confirm = useConfirm();

  const handleDelete=async(id)=>{
    const response=await deleteCompany(id)
    if(response.status=="200"){
      fetchData()
      return displayNotification("info","Successfully Deleted")
    }
  }

  const handleConfirm = (id) => {
    confirm({ description: `Are you sure want to delete this company` })
      .then(() => {
        handleDelete(id)
      })
      .catch(() => console.log("Deletion cancelled."));
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          // sx={{minWidth: 650, margin: "10px"}}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>
                Fat&nbsp;(g)
              </TableCell>
              <TableCell>
                Carbs&nbsp;(g)
              </TableCell>
              <TableCell>
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
                <TableCell >
                  {row.validTill}
                </TableCell>
                <TableCell >
                  {row.organizationName}
                </TableCell>
                <TableCell>
                  {row.companyId}
                </TableCell>
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
