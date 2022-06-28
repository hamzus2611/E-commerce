import React, { useEffect } from "react";
import logo from "../../assets/png-clipart-computer-icons-online-shopping-shopping-cart-service-shopping-cart-icon-text-service.png";
import { ShoppingCart, Search, Menu } from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  /*   Menu,
   */ Typography,
  InputBase,
} from "@mui/material";
import useStyles from "./styles";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems, handleSearch ,handleDrawerToggle }) => {
  const [search, setSerch] = useState("");
  console.log(search);
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    if (search) {
      handleSearch(search);
    }
  }, [search]);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            <div className={classes.titleName}>commerce.js</div>
          </Typography>
          <div className={classes.Search}>
            <div className={classes.SearchIconWrapper}>
              <Search />
            </div>
            <InputBase
              className={classes.styledInputBase}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSerch(e.target.value)}
            />
          </div>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge
                  component={Link}
                  to="/cart"
                  badgeContent={totalItems}
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
