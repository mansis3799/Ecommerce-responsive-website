import React,{ useEffect, useState }  from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";
import Card from './card';
import { getAllProduct } from './helper/coreapicalls';


export default function Home() {
  
  const [products,setProducts] = useState([]);
  const [error,setError] = useState(false);
 
  const loadAllProducts = () =>{
    return(
      getAllProduct().then(data=>{
        if(data && data.error){
           setError(data.error);
        }
        else{
          setProducts(data);
        }
      })
    )
  }

  useEffect(()=>{ loadAllProducts() },[]);

  return (
    <Base  title="Home page" description="Welcome to the Tshirt store!">
        <div className="row text-center">
            <h3 className="text-white">All of tshirts</h3>
            <div className="row">
              {products && products.map((product,index) =>{
                return(
                  <div key={index} className="col-4 mb-4">
                    <Card product={product}/>
                  </div>
                )
              })}
            </div>
        </div>
    </Base>
  );
}


