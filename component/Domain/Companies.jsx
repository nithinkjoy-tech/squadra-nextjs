import React from 'react'
import {useState} from "react"
import Header from "../Header"
import Table from "../Table/Table"
import Pagination from "../Pagination/Pagination"

const Companies = ({selectedDomain,open,handleOpen,handleClose,setEditFormData,setAction,setConfirmBoxOpen}) => {

  const [count,setCount]=useState(0)
  const [pageNumber,setPageNumber]=useState(3)

  return (
    <React.Fragment>
        <Header setAction={setAction} open={open} handleOpen={handleOpen} handleClose={handleClose} selectedDomain={selectedDomain} />
        <Table setConfirmBoxOpen={setConfirmBoxOpen} setAction={setAction} open={open} handleOpen={handleOpen} handleClose={handleClose} setEditFormData={setEditFormData} selectedDomain={selectedDomain}/>
        <Pagination count={count} setPageNumber={setPageNumber}/>
    </React.Fragment>
  )
}

export default Companies