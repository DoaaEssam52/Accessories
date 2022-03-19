import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.css";
import "./Styles/Contact.css";
import "./Styles/Home.css";
import "./Styles/Auth.css";
import "./Styles/ShopAll.css";
import "./Styles/Cart_Product.css";
import "./Styles/Navbar.css";
import "./Styles/Footer.css";
import "./Styles/Checkout.css";
import "./Styles/OurStory.css";
import "./Styles/Product.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import ShopAll from "./Components/ShopAll/ShopAll";
import OurCraft from "./Components/OurCraft/OurCraft";
import OurStory from "./Components/OurStory/OurStory";
import Contact from "./Components/Contact/Contact";
import Authentication from "./Components/Authentication/Authentication";
import ProductDetails from "./Components/ShopAll/ProductDetails";
import Checkout from "./Components/Checkout/Checkout";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initCart } from './redux/actions/productActions';


function App() {
  let dispatch=useDispatch();
  async function getCart() {
    let response = await axios.get("http://localhost:3001/Cart");
    dispatch(initCart(response.data.items));
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/ShopAll">
            <ShopAll />
          </Route>
          <Route path="/OurStory">
            <OurStory />
          </Route>
          <Route path="/OurCraft">
            <OurCraft />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Auth/:Auth_type">
            <Authentication />
          </Route>
          <Route path="/ProductDetails/:id">
            <ProductDetails />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  
  );
}

export default App;
