import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategory from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import ManageOrders from './admin/ManageOrders';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/cart';
import Contactme from './core/Contactme';
import UpdateOrder from './admin/UpdateOrder';

export default function Routes() {
    return(
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/signin" component={Signin}/>
              <Route exact path="/cart" component={Cart}/>
              <Route exact path="/contactme" component={Contactme}/>
              <PrivateRoute  path="/user/dashboard" exact component={UserDashBoard} />
              <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
              <AdminRoute path="/admin/create/category" exact component={AddCategory} />
              <AdminRoute path="/admin/categories" exact component={ManageCategory} />
              <AdminRoute path="/admin/create/product" exact component={AddProduct} />
              <AdminRoute path="/admin/products" exact component={ManageProducts} />
              <AdminRoute path="/admin/orders" exact component={ManageOrders} />
              <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
              <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
              <AdminRoute path="/admin/order/update/:orderId" exact component={UpdateOrder} />
          </Switch>
      </BrowserRouter>
    )
}

