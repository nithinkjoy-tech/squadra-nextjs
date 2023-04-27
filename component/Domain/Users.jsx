import React from 'react'
import Header from "../Header"
import Table from "../Table/Table"
import Pagination from "../Pagination/Pagination"

const Users = ({selectedDomain}) => {
  return (
    <React.Fragment>
        <Header selectedDomain={selectedDomain}/>
        <Table selectedDomain={selectedDomain}/>
        <Pagination/>
    </React.Fragment>
  )
}

export default Users