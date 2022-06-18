import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { commerce } from "./lib/commerce";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import Cart from "./components/Cart/Cart";
import { purple } from "@mui/material/colors";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [theme, setTheme] = useState();
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  };
  const handleAddToCart = async (productId, quantity) => {
    const data = await commerce.cart.add(productId, quantity);
    setCart(data.cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };
  const handleRemoveFrmCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
    setTheme(
      createTheme({
        palette: {
          primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
          },
          secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
          },
        },
      })
    );
  }, []);

  if (!theme || !cart) return "Loading...";
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route
              path="/"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFrmCart={handleRemoveFrmCart}
                  handleEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route path="/checkout" element={<Checkout cart={cart}/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      )
    </div>
  );
}

export default App;
