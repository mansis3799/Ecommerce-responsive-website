import React,{useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {isAuthnticate} from '../auth/helper';
import { createCategory } from './helper/adminapicall';

export default function AddCategory(){
    const [name,setName] = useState("");
    const [error,setError] = useState("false");
    const [success,setSuccess] = useState("false");

    const {user,token} = isAuthnticate();

    const handleChange = event => {
        setError("");
        setName(event.target.value);
      };
    
    const onSubmit = event =>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        
        //Backend request fire
        createCategory(user._id,token,{name})
        .then(data => {
            if (data && data.error) {
              setError(true)
            } else {
              setError("");
              setSuccess(true);
              setName("");
           }
        });
    } 

    const successMessage = () =>{
        return(
        <div className="alert alert-dark mt-2 p-2" style={{display: success==true ? "" : "none"}}>
            <h5>Category created successfully</h5>
        </div>
        )
    }

    const myCategoryForm = () =>{
        return(
        <form>
            <div className="form-group">
                <p className="lead mt-2">Enter the category</p>
                <input onChange={handleChange} value={name} type="text" className="form-control my-2" autoFocus required placeholder="For ex. summer"></input>
                <button onClick={onSubmit} className="btn btn-info text-dark m-2 rounded">Create category</button>
            </div>
        </form>
        )
    }

    const goBack = () =>{
      return(
         <div className="mt-2">
            <Link className="btn btn-sm btn-danger text-light rounded mb-2" to="/admin/dashboard">Admin Home</Link>
         </div>
      )
    }

    return(
        <Base title="Create a category here" description="Add a new category for new tshirts" className="container p-4 mb-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2"> 
                    {successMessage()}
                    {myCategoryForm()} 
                    {goBack()}
                </div>
            </div>
        </Base>
    )   
}