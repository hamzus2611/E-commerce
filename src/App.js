import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { commerce } from "./lib/commerce";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import Cart from "./components/Cart/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [theme, setTheme] = useState();
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const data = await commerce.cart.add(productId, quantity);
    setCart(data.cart);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
    setTheme(createTheme());
  }, []);
  console.log(cart);
  return (
    <div>
      {theme ? (
        <ThemeProvider theme={theme}>
          <Navbar totalItems={cart.total_items} />
          {/*           <Products products={products} onAddToCart={handleAddToCart}/>
           */}
          <Cart cart={cart} />
        </ThemeProvider>
      ) : (
        <h1>leading</h1>
      )}
    </div>
  );
}

export default App;
