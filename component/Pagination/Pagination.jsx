import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({
  count,
  pageNumber,
  setPageNumber,
}) {
  if(Object.is(count,NaN)) return;

  const handlePageChange = pageNumber => {
    setPageNumber(pageNumber);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        marginTop: "5rem",
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      Page No: {pageNumber}
      <Pagination
        count={count}
        color="primary"
        onChange={(event, pageNumber) =>
          handlePageChange(pageNumber)
        }
      />
      <div style={{width:"20%"}}></div>
    </Stack>
  );
}
