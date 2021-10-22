import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import Orders from "./pages/admin/order/Orders";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import CategoryProvider from "./context/category/categoryContext";
import ProductProvider from "./context/product/productContext";

const App = () => {
  return (
    <CategoryProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/category/:title" component={Products} />
              <Route exact path="/product/:id" component={Product} />
              <Route exact path="/cart" component={Cart} />
              <PrivateRoute
                exact
                path="/user/dashboard"
                component={UserDashboard}
              />
              {/* Admin routes */}
              <AdminRoute
                exact
                path="/admin/dashboard"
                component={AdminDashboard}
              />
              <AdminRoute
                exact
                path="/category/create"
                component={CreateCategory}
              />
              <AdminRoute
                exact
                path="/product/create"
                component={CreateProduct}
              />
              <AdminRoute exact path="/order" component={Orders} />
            </Switch>
          </div>
        </BrowserRouter>
      </ProductProvider>
    </CategoryProvider>
  );
};

export default App;
