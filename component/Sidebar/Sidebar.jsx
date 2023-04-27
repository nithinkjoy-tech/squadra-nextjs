import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Navbar from "../Navbar/Navbar"
const drawerWidth = 240;

export default function Sidebar({selectedDomain,setSelectedDomain}) {

  const handleClick=(domain)=>{
    console.log("clicked")
    setSelectedDomain(domain)
  }

  const selectedDomainStyle={
    color:"#ffffff",
    backgroundColor:"#4D47C3",
    '&:hover':{backgroundColor:"#4D47C3"}
  }

  const otherDomainStyle={
    color:"#151515",
    backgroundColor:"#fffffff"
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,height:"90px",bgcolor: "#F1F0FA"}}>
        <Toolbar>
      <Navbar/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto',marginTop:"30px" }}>
          <List>
            {['Users', 'Roles', 'Companies', 'Wholesalers'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={()=>handleClick(text)}>
                <ListItemButton sx={selectedDomain==text?selectedDomainStyle:otherDomainStyle} >
                  <ListItemIcon>
                  <CheckBoxOutlineBlankIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  <ArrowForwardIosIcon/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}