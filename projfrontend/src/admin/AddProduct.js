import React, {useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { createProduct, getAllCategory } from './helper/adminapicall';
import { isAuthnticate } from '../auth/helper';

export default function AddProduct(){

   const {user,token} = isAuthnticate();

   const [values,setValues] = useState({
       name : "",
       description : "",
       price : "",
       stock : "",
       photo : "",
       categories : [],
       category : "",
       loading : false,
       error : "",
       createdProduct : "",
       getaRedirect : false,
       formData : ""

   })

    const {name,description,price,stock,photo,categories,category,loading,error,createdProduct,getaRedirect,formData} = values;

    const preloading = () =>{
        getAllCategory().then(data=>{
            //console.log(data);
            if(data && data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,categories:data,formData:new FormData()});
                 //console.log("CATE:",categories);
            }
        })
    }

    useEffect(()=>{
        preloading();
    },[])

   const handleChange = name =>event =>{
     const value = name === "photo" ? event.target.files[0] : event.target.value;
     formData.set(name,value);
     setValues({...values,[name]:value});
    }
  
   const onSubmit = (event) =>{
     event.preventDefault();
     setValues({...values,error:"",loading:true});
     createProduct(user._id,token,formData)
     .then(data =>{
         if( data && data.error){
             setValues({...values,error:data.error})
         }
         else{
             setValues({
                 ...values,
                 name : "",
                 description : "",
                 price : "",
                 stock : "",
                 photo : "",
                 loading :false,
                 createdProduct :data.name
             })
         }
     })
  }

  const successMessage = () =>{
      return(
      <div className="alert alert-dark mt-2 p-2" style={{display: createdProduct ? "" : "none"}}>
          <h5>{createdProduct} created successfully</h5>
      </div>
      )
    }

    const createProductForm = () => (
        <form>
          {/* <span>Post photo</span> */}
          <div className="form-group mt-2">
            <label className="btn btn-block btn-dark">
              <input  onChange={handleChange("photo")}  type="file"  name="photo"  accept="image"  placeholder="choose a file" />
            </label>
          </div>
          
          <div className="form-group">
            <input  onChange={handleChange("name")}  name="photo"  className="form-control m-2"  placeholder="Name"  value={name}  />
          </div>

          <div className="form-group">
            <textarea  onChange={handleChange("description")}  name="photo"  className="form-control m-2"  placeholder="Description"  value={description}  />
          </div>

          <div className="form-group">
            <input  onChange={handleChange("price")}  type="number"  className="form-control m-2"  placeholder="Price"  value={price} />
          </div>

          <div className="form-group">
            <select  onChange={handleChange("category")}  className="form-control m-2" placeholder="Category">
              <option>Select</option>
              {categories && categories.map((cate,index)=>(
                 <option key={index} value={cate._id}>{cate.name}</option> 
              ))}
            </select>
          </div>

          <div className="form-group">
            <input  onChange={handleChange("stock")}  type="number"  className="form-control m-2"  placeholder="Quantity" value={stock}/>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn m-1 btn-outline-info rounded">Create Product</button>
        </form>
      );



    return(
        <Base title="Add Product here" description="Welcome to product creation section!"
        className="container rounded p-4 mb-2">
          <Link className="btn btn-danger btn-md text-light rounded mb-3" to="/admin/dashboard">Admin Home</Link>
          <div className="row bg-dark text-white pt-2 pb-2 ">
              <div className="col-md-8 offset-md-2 ">
                  {successMessage()}
                  {createProductForm()}
             </div>
          </div>
        </Base>
    )
}