import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getOrderStatus,getAllStatus,getOrder, updateStatus } from "./helper/adminapicall";
import { isAuthnticate } from "../auth/helper/index";

const UpdateOrder = ({ match }) => {
    const { user, token } = isAuthnticate();

    const [values, setValues] = useState({
        status: "",
        statuses: [],
        transaction_id: "",
        amount: "",
        order: "",
        loading: false,
        error: "",
        success:"",
        createdOrder: "",
        getaRedirect: false,
        enumValues: ""
      });
    
      const { status,statuses,transaction_id,amount,order,loading,error,createdOrder,enumValues,getaRedirect } = values;

      const preload = (orderId) => {
        // console.log("DATA ID",orderId);
        getOrder(orderId).then(data => {
           console.log("DATA before update",data);
          // console.log("DATA Status",data.status);
          if (data && data.error) {
            console.log("DATA",data);
            setValues({ ...values, error: data.error });
          } else {
             preloadCategories();
            setValues({
               ...values,
               status: data && data.status
            });
          }   
        });
      };

      const preloadCategories = (orderId) => {
        getOrderStatus(orderId).then(data => {
          console.log("ORDERS",data);
          if (data && data.error) {
            console.log("error",data);
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              statuses: data
            });
          }
        });
      };
 
      useEffect(() => {
        preload(match.params.orderId);
      }, []);

      //TODO: work on it
      const onSubmit = event => {
        event.preventDefault();
        console.log(status);
        setValues({ ...values, error: "", loading: true });
   
        updateStatus(match.params.orderId, user._id, token, status).then(data => {
              console.log("Data after update",data);
              if (data && data.error) {
                  console.log("There is error",data.error);
                  setValues({ ...values, error: data.error });     
                } else {
                  console.log("There is no error");
              setValues({
                ...values,
                // status : status,
                loading : false,
                createdOrder : status 
              });
              console.log("CREATEDORDER",status);
            }
          }
        );
      };
   
      const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        // formData.set(name, value);
        setValues({ ...values, [name]: value });
      };
    
      const successMessage = () => (
        <div
          className="alert alert-success mt-3 p-2"
          style={{ display: createdOrder ? "" : "none" }}
        >
          <h5>{createdOrder} updated successfully</h5>
        </div>
      );

      const createProductForm = () => (
        <form>
          <div className="form-group">
          <p className="lead mt-2">Enter the updated order status</p>
            <select
            onChange={handleChange("status")}
            className="form-control m-2"
            placeholder="Status"
        >
          <option className="text-black">Select</option>
          {statuses &&
            statuses.map((stae, index) => (
              <option key={index} value={stae}> {stae} </option>
            ))}
        </select>  
          </div>

          <button  type="submit"  onClick={onSubmit}  className="btn btn-info text-dark rounded mb-2 mt-2">Update Order</button>
        </form>
      );

      const goBack = () =>{
        return(
           <div className="mt-2">
              <Link className="btn btn-sm btn-danger text-light rounded mb-2" to="/admin/dashboard">Admin Home</Link>
           </div>
        )
      }
       
    return (
        <Base
          title="Update the order here!"
          description="Welcome to order updation section"
          className="container rounded p-4 mb-2"
        >
          <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
              {successMessage()}
              {createProductForm()}
              {goBack()}
            </div>
          </div>
        </Base>
      );
    };
  
    
    export default UpdateOrder;