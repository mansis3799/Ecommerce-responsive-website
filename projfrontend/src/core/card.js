import React,{useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

export default function Card( {product,
  addtoCart=true,
  removeFromCart=false,
  setReload=(f)=> f , //function(f){ return f };
  reload=undefined} ){

    const [redirect,setRedirect] = useState(false);
    const [count,setCount] = useState(product.count);

    const cartTitle = product ? product.name : "A photo from pexels";
    const cartDescription = product ? product.description : "This photo looks great";
    const cartPrice = product ? product.price : "DEFAULT";


    const addToCart = () =>{
        addItemToCart(product,() => setRedirect(true));
    }

    const getaRedirect = (redirect) =>{
          if(redirect){
              return <Redirect to="/cart"></Redirect>
          }
    }
   
    const showAddToCart = (addtoCart) =>{
        return(
          addtoCart && (
            <button onClick={addToCart}  className="btn btn-block btn-outline-success mt-2 mb-2 text-light rounded" > Add to Cart</button>  
           )
        )
    }

    const showremoveFromCart = (removeFromCart) =>{
        return(
            removeFromCart && (
            <button onClick={() => {removeItemFromCart(product._id); setReload(!reload)}}  className="btn btn-block btn-outline-success rounded text-light mt-2 mb-2">Remove from cart</button>  
           )
        )
    }

        return (
          <div className="card text-white bg-dark border border-info mb-3">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getaRedirect(redirect)}
              <ImageHelper product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap ">{cartDescription}</p>
              <p className="btn btn-success rounded  btn-sm px-4 text-white ">{cartPrice} $</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showremoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
};

