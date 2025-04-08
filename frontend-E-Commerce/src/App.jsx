import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Products from "./Pages/Products"
import Contact from "./Pages/Contact"
import ProductDetails from "./Pages/ProductDetails"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import './Style/Components.css';
import './Style/Pages.css';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUser } from "./Config/userSlice"
import Cart from "./Pages/Cart"
import { fetchFavourites } from "./Config/favouriteSlice"
import Favourite from "./Pages/Favourite"
import { fetchCart } from "./Config/cartSlice"
import Checkout from "./Pages/Checkout"
import { fetchAllWatchs, fetchBrands } from "./Config/watchSlice"


function App() {

  const user = useSelector(state => state.userData.user);
  const token = useSelector(state => state.userData.token);
  const dispatch = useDispatch();
  console.log(user);


    useEffect(() => {
      if (token) {
          dispatch(fetchUser(token));
      }
    }, [token, dispatch]);

    useEffect(()=>{
      dispatch(fetchAllWatchs())
      dispatch(fetchBrands());
  },[dispatch])

    useEffect(() => {
      if (user?.id && token) {
          dispatch(fetchFavourites({ token, userId: user.id }));
          dispatch(fetchCart({ token, userId: user.id }));
      }
}, [user?.id, token, dispatch]);

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={user ? <Home /> : <Register />} />
                    <Route path="/login" element={user ? <Home /> : <Login />} />
                    <Route path="/product/detail/:id" element={<ProductDetails />} />
                    <Route path="/product/cart" element={<Cart />} />
                    <Route path="/product/fav" element={<Favourite />} />
                    <Route path="/product/checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
