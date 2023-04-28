import Image from "next/image";
import logo from "../../public/logo.png";
import React from "react";
import {
  companyNameStyle,
  logoStyle,
  navbarStyle,
} from "./NavbarStyles";

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <div style={{display: "flex"}}>
        <div style={logoStyle}>
          <Image src={logo} alt="Picture of the author" />
        </div>
        <div style={companyNameStyle}>
          <p>Squadra</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
