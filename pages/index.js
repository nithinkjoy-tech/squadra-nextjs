import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import Table from "../component/Table/Table";
import {Grid} from "@material-ui/core";
import {useState} from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const [selectedDomain, setSelectedDomain] =
    useState("Companies");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={2}>
          <Sidebar
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
          />
        </Grid>
        <Grid item md={10}>
          <Table/>
        </Grid>
      </Grid>
    </>
  );
}
