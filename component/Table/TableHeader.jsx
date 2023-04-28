
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TableHeader=()=>{
    return (
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
    )
}

export default TableHeader