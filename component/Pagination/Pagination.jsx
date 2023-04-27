import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({count,setPageNumber}) {

    const handlePageChange=(pageNumber)=>{
        setPageNumber(pageNumber)
    }

  return (
    <Stack spacing={2} sx={{marginTop:"5rem",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Pagination count={10} color="primary" onChange={(event,pageNumber)=>handlePageChange(pageNumber)} />
    </Stack>
  );
}