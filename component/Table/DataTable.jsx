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
import {useConfirm} from "material-ui-confirm";
import {deleteCompany} from "../../api/deleteCompany";
import {displayNotification} from "../../services/notificationService";
import {getCompany} from "../../api/getCompany";
import {deleteUser} from "../../api/deleteUser";
import {getUser} from "../../api/getUser";

let companies = {
  companyName: "Company Name",
  companyEmail: "Company Email",
  validTill: "Valid Till",
  organizationName: "Organization Name",
  companyId: "Company ID",
  // actions: "Actions",
};

let users = {
  // first_name:"First Name",
  // last_name:"Last Name",
  email: "Email",
  phone: "Phone Number",
  company_name: "Company Name",
  user_state: "User State",
  actions: "",
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
  const fetchData = async () => {
    if (selectedDomain == "Companies") {
      try {
        const data = await getCompany(pageNumber);
        setData(data);
      } catch (err) {
        displayNotification("error", "Could not fetch data");
      }
    }

    if (selectedDomain == "Users") {
      try {
        const data = await getUser(pageNumber);
        console.log(data, "jjj");
        setData(data);
      } catch (err) {
        console.log(err, "mm");
        displayNotification("error", "Could not fetch data");
      }
    }
  };

  const confirm = useConfirm();

  const handleDelete = async id => {
    if (selectedDomain == "Companies") {
      try {
        const response = await deleteCompany(id);
        if (response.status == "200") {
          fetchData();
          return displayNotification("info", "Successfully Deleted");
        }
      } catch (err) {
        displayNotification("error", "Could not delete data");
      }
    }

    if (selectedDomain == "Users") {
      try {
        const response = await deleteUser(id);
        if (response.status >= "200" || response.status < "300") {
          fetchData();
          return displayNotification("info", "Successfully Deleted");
        }
      } catch (err) {
        displayNotification("error", "Could not delete");
      }
    }
  };

  const getDomain = () => {
    if (selectedDomain == "Companies") return "company";
    if (selectedDomain == "Users") return "user";
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

  console.log(data, "wer");

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
                    {row.first_name + " " + row.last_name}
                  </TableCell>
                )}
                {data?.domain &&
                  Object.entries(eval(data.domain.toLowerCase())).map(
                    ([key, value]) => {
                      if (key == "user_state") {
                        return (
                          <TableCell key={key}>
                            {row[key] ? "Active" : "Inactive"}
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={key}>{row[key]}</TableCell>;
                      }
                    }
                  )}
                <TableCell>
                  <EditIcon
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      if (selectedDomain == "Users") {
                        row.user_state = row?.user_state
                          ? "Active"
                          : "Inactive";
                      }
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
                      if (selectedDomain == "Users") {
                        handleConfirm(row.user_id);
                      } else {
                        handleConfirm(row.id);
                      }
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
