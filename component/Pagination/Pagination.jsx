import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({
  count,
  setPageNumber,
}) {
  console.log(count,"count")
  const handlePageChange = pageNumber => {
    setPageNumber(pageNumber);
    console.log(pageNumber,"pno")
  };

  return (
    <Stack
      spacing={2}
      sx={{
        marginTop: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pagination
        count={count}
        color="primary"
        onChange={(event, pageNumber) =>
          handlePageChange(pageNumber)
        }
      />
    </Stack>
  );
}
