import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import {
  AdUnits,
  Blender,
  Chair,
  Computer,
  Countertops,
  ElectricalServices,
  ExpandLess,
  ExpandMore,
  PhoneAndroid,
  StarBorder,
  Tablet,
} from "@mui/icons-material";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { useEffect } from "react";

const drawerWidth = 240;

function Sidebare({ mobileOpen,handleSearch, handleDrawerToggle }) {
  const [search, setSerch] = useState("");
  console.log(search);
  const [open, setOpen] = useState(false);
  const [openSante, setOpenSante] = useState(false);
  const [openMaison, setOpenMaison] = useState(false);
  const handleClickMaison = () => {
    setOpenMaison(!openMaison);
    setOpen(false);
    setOpenSante(false);
  };
  const handleClick = () => {
    setOpen(!open);
    setOpenMaison(false);
    setOpenSante(false);
  };
  const handleClicksante = () => {
    setOpenSante(!openSante);
    setOpenMaison(false);
    setOpen(false);
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={handleClickMaison}>
          <ListItemIcon>
            <Countertops />
          </ListItemIcon>
          <ListItemText primary="Maison && Bureau" />
          {openMaison ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMaison} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Électroménager')}>
              <ListItemIcon>
                <ElectricalServices />
              </ListItemIcon>
              <ListItemText primary="Électroménager" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Cuisine')} >
              <ListItemIcon>
                <Blender />
              </ListItemIcon>
              <ListItemText primary="Cuisine & Arts Culinaires" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Maison')}>
              <ListItemIcon>
                <Chair />
              </ListItemIcon>
              <ListItemText primary="Maison" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AdUnits />
          </ListItemIcon>
          <ListItemText primary="Telephone Tablette" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Smartphone')}>
              <ListItemIcon>
                <PhoneAndroid />
              </ListItemIcon>
              <ListItemText primary="Smartphone" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Tablette')}>
              <ListItemIcon>
                <Tablet />
              </ListItemIcon>
              <ListItemText primary="Tablette" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClicksante}>
          <ListItemIcon>
            <AdUnits />
          </ListItemIcon>
          <ListItemText primary="Santé & Beauté" />
          {openSante ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSante} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Maquillage')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Maquillage" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>setSerch('Sante')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="sante beaute beaute soins personnels" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  useEffect(() => {
    if (search) {
      handleSearch(search);
    }
  }, [search])
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Sidebare;
