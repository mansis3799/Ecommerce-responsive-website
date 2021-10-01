import React,{useState,useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { isAuthnticate } from '../auth/helper';
import { getAllProduct,deleteProduct } from './helper/adminapicall';

export default function ManageProducts(){

    const {user,token} = isAuthnticate();

    const [products,setProducts] = useState([]);

    const preload = () =>{
       getAllProduct().then(data=>{
            if(data && data.error){
                console.log(data.error);
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(()=>{ preload() },[]);

    const deleteThisProduct = (productId) =>{
       deleteProduct(productId,user._id,token).then(data=>{
           if(data && data.error){
               console.log(data.error);
           }
           else{
               preload();
           }
       })
    }

    return(
        <Base title="Welcome admin" description="Manage products here">
      {/* <h2 className="mb-4">All products:</h2> */}
      <Link className="btn btn-danger text-light rounded" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>

          {products && products.map((product,index) =>{
            console.log("products",product);
            return(
            <div key={index} className="row text-center mb-2">
            <div className="col-4">
              <h3 className="text-white text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link  className="btn btn-dark rounded" to={`/admin/product/update/${product._id}`} >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={()=>{deleteThisProduct(product._id)}} className="btn btn-dark rounded">Delete</button>
            </div>
            </div>
             )
          })}    
        </div>
      </div>
    </Base>
     )
}