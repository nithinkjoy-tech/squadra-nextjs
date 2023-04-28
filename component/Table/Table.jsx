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

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable({
  selectedDomain,
  setPageNumber,
  handleOpen,
  handleClose,
  setEditFormData,
  setAction,
}) {

  const confirm = useConfirm();

  const handleDelete = (id) => {
    confirm({ description: `Are you sure want to delete this company` })
      .then(() => console.log("deleted",id))
      .catch(() => console.log("Deletion cancelled."));
  }

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
            {rows.map(row => (
              <TableRow
                key={row.name}
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
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.calories}
                </TableCell>
                <TableCell align="right">
                  {row.fat}
                </TableCell>
                <TableCell align="right">
                  {row.carbs}
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
                    onClick={(row) => handleDelete(row.id)}
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

// export default function Table(){

//     return (
//         <>
//             <div className="container">
//   <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
//   <ul className="responsive-table">
//     <li className="table-header">
//       <div className="col col-1">Job Id</div>
//       <div className="col col-2">Customer Name</div>
//       <div className="col col-3">Amount Due</div>
//       <div className="col col-4">Payment Status</div>
//     </li>
//     <li className="table-row">
//       <div className="col col-1" data-label="Job Id">42235</div>
//       <div className="col col-2" data-label="Customer Name">John Doe</div>
//       <div className="col col-3" data-label="Amount">$350</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row">
//       <div className="col col-1" data-label="Job Id">42442</div>
//       <div className="col col-2" data-label="Customer Name">Jennifer Smith</div>
//       <div className="col col-3" data-label="Amount">$220</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row">
//       <div className="col col-1" data-label="Job Id">42257</div>
//       <div className="col col-2" data-label="Customer Name">John Smith</div>
//       <div className="col col-3" data-label="Amount">$341</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//     <li className="table-row">
//       <div className="col col-1" data-label="Job Id">42311</div>
//       <div className="col col-2" data-label="Customer Name">John Carpenter</div>
//       <div className="col col-3" data-label="Amount">$115</div>
//       <div className="col col-4" data-label="Payment Status">Pending</div>
//     </li>
//   </ul>
// </div>
//         </>
//     )
// }
