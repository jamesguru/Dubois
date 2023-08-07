import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import Orders from "./pages/Orders";
import Gallery from "./pages/Gallery";

import SearchProductList from "./pages/SearchedProductList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Seller from "./pages/Seller";
import DashBoard from "./pages/DashBoard";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import ProductDataGrid from "./components/ProductDataGrid";

const App = () => {
  const user = useSelector((state) => state.user.currentuser);

  return (
    <div>
      <Router>
        <ScrollToTop />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/products/:category">
            <ProductList />
          </Route>

          <Route path="/product/:id">
            <Product />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>

          <Route path="/success">
            <Success />
          </Route>

          <Route path="/search/:search">
            <SearchProductList />
          </Route>
          <Route path="/shop/:shop">
            <Shop />
          </Route>

          <Route path="/orders/:id">
            <Orders />
          </Route>
         
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/seller">
            <Seller />
          </Route>


          <Route path="/login">
            {user ? <Redirect exact to="/" /> : <Login />}
          </Route>

          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
