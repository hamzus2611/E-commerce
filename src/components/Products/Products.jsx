import React from "react";
import Grid from "@mui/material/Grid";
import Product from "../Product/Product";
import useStyles from "./styles";
import { SearchOff } from "@mui/icons-material";

function Products({ products, onAddToCart }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {products ? (
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.searchoff}>
          <SearchOff sx={{ fontSize: 50 }}  />
          <br />
          Aucun résultat 
          <br />
        </div>
      )}
    </main>
  );
}

export default Products;
