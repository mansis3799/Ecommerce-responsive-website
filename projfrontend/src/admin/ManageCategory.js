import React,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { isAuthnticate } from '../auth/helper';
import { getAllCategory,deleteCategory } from './helper/adminapicall';

export default function ManageCategory(){
  
    const {user,token} = isAuthnticate();

    const [categories,setCategory] = useState([]);

    const preload = () =>{
       getAllCategory().then(data=>{
         console.log("Category",data);
            if(data && data.error){
                console.log(data.error);
            }
            else{
                setCategory(data);
            }
        })
    }

    useEffect(()=>{ preload() },[]);

    const deleteThisCategory = (categoryId) =>{
      deleteCategory(categoryId,user._id,token).then(data=>{
          if(data && data.error){
              console.log(data.error);
          }
          else{
              preload();
          }
      })
   }


    return(
        <Base title="Welcome admin" description="Manage category here">
        {/* <h2 className="mb-4">All products:</h2> */}
        <Link className="btn btn-danger text-light rounded" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>
               
             {categories && categories.map((category,index) =>{
               console.log("categoriess",category);
                return(
              <div key={index} className="row text-center mb-2">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link  className="btn btn-dark rounded" to={`/admin/category/update/${category._id}`} >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={()=>{deleteThisCategory(category._id)}} className="btn btn-dark rounded">Delete</button>
              </div>
              </div>
                )
            })}
          </div>
        </div>
      </Base>
    )
}