import React from 'react';
import Base from "../core/Base";
import {Link} from 'react-router-dom';
import { isAuthnticate } from '../auth/helper';

export default function AdminDashboard(){

    const {user} = isAuthnticate();

    const AdminLeftSide = () =>{
        return(
          <div className="card">
             <h4 className="card-header text-black">Admin Navigation</h4>
             <ul className="list-group">
                 <li className="list-group-item">
                     <Link to="/admin/create/category" className="nav-link text-dark ">Create Categories</Link>
                 </li>
                 <li className="list-group-item">
                     <Link to="/admin/categories" className="nav-link text-dark ">Manage Categories</Link>
                 </li>
                 <li className="list-group-item">
                     <Link to="/admin/create/product" className="nav-link text-dark ">Create Products</Link>
                 </li>
                 <li className="list-group-item">
                     <Link to="/admin/products" className="nav-link text-dark ">Manage Products</Link>
                 </li>
                 <li className="list-group-item">
                     <Link to="/admin/orders" className="nav-link text-dark ">Manage Orders</Link>
                 </li>
             </ul>
          </div>
        )
    }

    const AdminRightSide = () =>{
        return(
         <div className="card mb-4">
             <h4 className="card-header text-black">Admin information</h4>
             <ul className="list-group">
                 <li className="list-group-items m-2">
                    <span className=" text-dark">Name: </span>{user.name}
                 </li>
                 <hr className="m-0 "></hr>
                 <li className="list-group-items m-2">
                    <span className=" text-dark">Email: </span>{user.email}
                 </li>
                 <hr className="m-0 "></hr>
                 <li className="list-group-items m-2">
                    <h5 className="text-white bg-danger p-1 text-center">This is Admin area</h5>
                 </li>
             </ul>
         </div>
        )
    }

    return(
        <Base title="AdminDashboard" description="Manage all of your product's here" className="container p-2 mb-4">
            <div className="row">
              <div className="col-3">{AdminLeftSide()}</div>
              <div className="col-9">{AdminRightSide()}</div>
            </div>
        </Base>
    )
}