import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';
import { isAuthnticate } from '../auth/helper';
import { getAllOrders,deleteOrder } from './helper/adminapicall';

export default function ManageOrders(){

        const {user,token} = isAuthnticate();

        const [orders,setOrders] = useState([]);
      
        const preload = () =>{
            getAllOrders().then(data=>{
                 if(data && data.error){
                     console.log(data.error);
                 }
                 else{
                     console.log("Orders",data);
                     setOrders(data);
                 }
             })
         }
     
         useEffect(()=>{ preload() },[]);

         
    const deleteThisOrder = (orderId) =>{
      deleteOrder(orderId,user._id,token).then(data=>{
          if(data && data.error){
              console.log(data.error);
          }
          else{
              preload();
          }
      })
   }

        return(
        <Base title="Welcome admin" description="Manage orders here">
        {/* <h2 className="mb-4">All products:</h2> */}
        <Link className="btn btn-danger text-light rounded" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>

        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total {orders.length} orders</h2> 
            <div className="col-6">
              <h3 className="text-white text-center my-3">Order I'd</h3>
            </div>

             {orders.map((order,index) =>{
               console.log("orders",order);
              return(
              <div key={index} className="row text-center mb-2">
              <div className="col-6">
                <h3 className="text-white ">{order._id}</h3>
              </div>
              <div className="col-6">
                <Link  className="btn btn-dark rounded" to={`/admin/order/update/${order._id}`} >
                  <span className="">Update Order Status</span>
                </Link>
              </div>
              {/* <div className="col-4">
                <button onClick={()=>{deleteThisOrder(order._id)}} className="btn btn-danger">Delete</button>
              </div> */}
              </div>
             )})}
          </div>
        </div>
        </Base>
    )
}