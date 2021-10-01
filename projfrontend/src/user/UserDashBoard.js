import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { userPurchaseList } from '../admin/helper/adminapicall';
import { isAuthnticate } from '../auth/helper';
import Base from "../core/Base";
import Card from '../core/card';

export default function UserDashBoard() {
  const {user, token} = isAuthnticate();

  const [orders,setOrders] = useState([]);

  const preload = (userId,token) =>{
   }

   useEffect(()=>{ preload(user._id);

    console.log("UserId",user._id);
    userPurchaseList(user._id,token).then(data=>{
          if(data && data.error){
              console.log(data.error);
          }
          else{
              console.log("Orders",data);
              setOrders(data);
          }
      })
        console.log(user);
},[]);


  const GetSomething=()=>{
    if(orders && orders.length>0){
      return(
        <div className="row">
          {orders.map((order,index) =>{
        console.log("Full order",order);
        return(                                     
        <div key={index} className="row mb-3">
          <div className="row">
            <h4 className="text-light my-3">Purchases:</h4>
           <h3>{order.products.map((prod, i)=>{
             return(
               <div key={i} className="col-4 mb-4 text-center text-white">           
               <Card className="col-4" product={prod} addtoCart={false}></Card>
               </div>
             )
           })}</h3>
          </div>
           <h4 className="text-light">Total amount: {order.amount}</h4>
           <h4 className="text-light">Status: {order.status}</h4>
          </div>
        )
        })} 
          </div>
      )
    }
    else{
        <h4 className="text-white">No products here!</h4>
      }
  }

  return(
  <Base title="Welcome user" description="See your i'd information and orders information here">
  <div className="row">
      {/* <h4 className="text-white my-2"> UserId: {user._id}</h4>  */}
      <h4 className="text-light my-2"> Email: {user.email}</h4>
      <h4 className="text-light my-2"> Name: {user.name}</h4> 
      {orders.length > 0 ?(GetSomething()):(<h4 className="text-white my-3"> Purchases: No products</h4>)}
      </div>
  </Base>
)
}
