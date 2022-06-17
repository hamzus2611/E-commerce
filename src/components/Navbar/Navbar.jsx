import React, { useEffect } from "react";
import logo from "../../assets/png-clipart-computer-icons-online-shopping-shopping-cart-service-shopping-cart-icon-text-service.png";
import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import { useState } from "react";
const Navbar = ({totalItems}) => {

    const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            commerce.js
          </Typography>
          <div className={classes.grow} />
            <div className={classes.button}>
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
