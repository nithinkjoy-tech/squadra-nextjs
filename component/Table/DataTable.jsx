import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import useMutateHook from "../../hooks/useMutateHook";
import deleteCompany from "../../api/companies/deleteCompany";
import deleteUser from "../../api/users/deleteUser";
import deleteRole from "../../api/roles/deleteRole";
import deleteWholesaler from "../../api/wholesalers/deleteWholesaler";
import {useConfirm} from "material-ui-confirm";

let companies = {
  companyName: "Company Name",
  companyEmail: "Company Email",
  validTill: "Valid Till",
  organizationName: "Organization Name",
  companyId: "Company ID",
};

let roles = {
  roleName: "Role Name",
  organizationName: "Organization Name",
  createdDate: "Created Date",
  roleState: "Role State",
  roleId: "Role ID",
};

let users = {
  email: "Email",
  phoneNumber: "Phone Number",
  companyName: "Company Name",
  userState: "User State",
};

let wholesalers = {
  firstName:"First Name",
  lastName:"Last Name",
  email: "Email",
  phoneNumber: "Phone Number",
  wholesalerId: "Wholesaler Id",
};

export default function BasicTable({
  handleOpen,
  setEditFormData,
  selectedDomain,
  setAction,
  pageNumber,
  setData,
  data,
}) {
  const getDeleteMethod = selectedDomain => {
    if (selectedDomain == "Users") return deleteUser();
    if (selectedDomain == "Companies") return deleteCompany();
    if (selectedDomain == "Roles") return deleteRole();
    if (selectedDomain == "Wholesalers") return deleteWholesaler();
  };

  const mutation = useMutateHook(getDeleteMethod(selectedDomain));

  const confirm = useConfirm();

  const handleDelete = async id => {
    mutation.mutate(id);
  };

  const getDomain = () => {
    if (selectedDomain == "Companies") return "company";
    if (selectedDomain == "Users") return "user";
    if (selectedDomain == "Roles") return "role";
    if (selectedDomain == "Wholesalers") return "wholesaler";
  };

  const handleConfirm = id => {
    confirm({description: `Are you sure want to delete this ${getDomain()}`})
      .then(() => {
        handleDelete(id);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  if (data?.content?.length == 0)
    return <div style={{marginLeft: "10rem"}}>No Data to display</div>;

  return (
    <div style={{marginTop: "1rem"}}>
      <Divider />
      <TableContainer>
        <Table
          style={{borderCollapse: "separate", borderSpacing: "0px 1rem"}}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {data?.domain == "Users" && (
                <TableCell key="fname" style={{borderBottom: "none"}}>
                  Full Name
                </TableCell>
              )}
              {data?.domain &&
                Object.entries(eval(data?.domain?.toLowerCase())).map(
                  ([key, value]) => (
                    <TableCell key={key} style={{borderBottom: "none"}}>
                      {value}
                    </TableCell>
                  )
                )}
              {data?.domain && (
                <TableCell key="action" style={{borderBottom: "none"}}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map((row, index) => (
              <TableRow sx={{backgroundColor: "#F0EFFF"}} key={index}>
                {data?.domain == "Users" && (
                  <TableCell key="fullname">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                )}
                {data?.domain &&
                  Object.entries(eval(data.domain.toLowerCase())).map(
                    ([key, value]) => (
                      <TableCell key={key}>{row[key]}</TableCell>
                    )
                  )}
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
                    onClick={() => {
                      handleConfirm(row._id);
                    }}
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
