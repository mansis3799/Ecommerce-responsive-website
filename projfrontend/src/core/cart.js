import React,{useState,useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";
import Card from './card';
import { loadToCart } from './helper/cartHelper';
import Paymentb from './paymentb';
import { getmeToken, processPayment } from './helper/paymentHelper';
import DropIn from "braintree-web-drop-in-react";
import { isAuthnticate } from '../auth/helper';

export default function Cart() {
  
    const [products,setProducts] = useState([]);
    
    const [info,setInfo] = useState({
        clientToken:null,
        loading:false,
        success:"",
        error:"",
        instance:""
    })
    const [reload,setReload] = useState(false);
    
    useEffect(()=>{ setProducts(loadToCart());},[reload]);

    const loadAllProducts = (products) =>{
        return(
            <div>
                <h2 className="text-light mb-4">Load products here</h2>
                {products && products.map((product,index)=>{
                   return(
                   <Card key={index} product={product} addtoCart={false} removeFromCart={true} setReload={setReload} reload={reload}/>
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div><h2>This section is for checkout</h2></div>
        )
    }
  
    return (
      <Base title="Cart page" description="Ready to checkout!">
          <div className="row text-center">
              {/* <h2 className="text-white ">Products in my cart</h2> */}
              <div className="row">
                <div className="col-5">
                  {products && products.length > 0 ? (loadAllProducts(products)): (<h3 className="text-light">There is no products in the cart</h3>)}
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                { isAuthnticate() ?  (<Paymentb products={products} setReload={setReload}/>):(<h3 className="text-light">Please login for the payment</h3>)}
                </div>    
              </div>
          </div>
      </Base>
    );
  }