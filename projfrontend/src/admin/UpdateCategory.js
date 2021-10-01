import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory,updateCategory } from "./helper/adminapicall";
import { isAuthnticate } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
    
    const {user,token} = isAuthnticate();
  
    const [values, setValues] = useState({
      name: "",
      category: "",
      name: "",
      loading: false,
      error: "",
      success:"",
      createdCategory: "",
      getaRedirect: false,
    });

    const { name,category,loading,error,createdCategory,getaRedirect } = values;

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
           console.log("DATA",data);
           console.log("DATA Name",data.name);
          if (data && data.error) {
            console.log("DATA",data);
            setValues({ ...values, error: data.error });
          } else {
            setValues({
               ...values,
               name: data && data.name
            });
          }     
        });
      };

      useEffect(() => {
        preload(match.params.categoryId);
      }, []);
    
      //TODO: work on it
      const onSubmit = event => {
        event.preventDefault();
        console.log(name);
        setValues({ ...values, error: "", loading: true });
        updateCategory(match.params.categoryId,user._id,token,name).then(
          data => {
            console.log("data",data);
            console.log("UPDATECATEGORY",category);
            if (data && data.error) {
              console.log("There is error");
              setValues({ ...values, error: data.error });
            } else {
              console.log("There is no error");
              setValues({
                ...values,
                name: "",
                loading: false,
                createdCategory: data && data.name
              });
              console.log("CREATEDCATEGORY",createdCategory);
            }
          }
        );
      };
    
      const handleChange = name => event => {
       
        const value = name === "name" ? event.target.value : event.target.value.error;
        //category.set(name,value);
        setValues({ ...values, [name]: value });
      };
    
      const successMessage = () => (
        <div
          className="alert alert-success mt-3 p-2"
          style={{ display: createdCategory ? "" : "none" }}
        >
          <h5>{createdCategory} updated successfully</h5>
        </div>
      );
    
      const createCategoryForm = () => (
        <form>
          <div className="form-group">
          <p className="lead mt-2">Enter the updated category name</p>
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control mt-2"
              placeholder="Name"
              value={name}
            />
          <button  type="submit"  onClick={onSubmit}  className="btn btn-info text-dark rounded mb-2 mt-2">Update Category</button>
          </div>
          
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
          title="Update the category here!"
          description="Welcome to category updation section"
          className="container p-4 mb-4"
        >
          {/* <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link> */}
          <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
              {successMessage()}
              {createCategoryForm()}
              {goBack()}
            </div>
          </div>
        </Base>
      );
    };
    
    export default UpdateCategory;