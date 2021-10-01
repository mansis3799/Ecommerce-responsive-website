import React, { useState, useEffect } from "react";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, getUser, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthnticate } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products,setReload = f => f, reload = undefined }) => {
  
  const {user} = isAuthnticate();

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: ""
  });

   const userId = isAuthnticate() && isAuthnticate().user._id;
   const token = isAuthnticate() && isAuthnticate().token;

  const getToken=() =>{
    getmeToken().then(info => {
        console.log("INFORMATION",info);
       if (info && info.error) {
         setInfo({ ...info, error: info.error });
       } else {
         const clientToken = info && info.clientToken;
         setInfo({ clientToken });
      }
     }).catch(err =>console.log("ERROR",err))
}


    const showbtdropIn = () => {
        return (
          <div>
            {info.clientToken !== null && products && products.length > 0 ? (
              <div>
                <h3 className="text-light">Your bill is {getAmount()} $</h3>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={instance => (info.instance = instance)}
                />
                <button className="btn btn-block btn-danger rounded text-light m-1" onClick={onPurchase}>Buy</button>
              </div>
            ) : (
              <h3 className="text-light text-left">Please add something to cart</h3>
            )}
          </div>
        );
      };
    
       useEffect(() => getToken(userId,token), []);  

    const getAmount = () =>{
      let amount=0;
      products && products.map(p => {
          amount = amount + p.price;
        });
        return amount;      
  }

    const onPurchase = () => {
        setInfo({ loading: true });
      
         //Get the user information
          getUser(userId,token).then(info => {
            console.log("USER INFORMATION",info);
           if (info && info.error) {
             setInfo({ ...info, error: info.error });
           } else {
            setInfo({ ...info,name:info.name,email:info.email,role:info.role});
          }
         }).catch(err =>console.log("ERROR",err));
        

        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount()
        };
          processPayment(paymentData)
            .then(response => {
            console.log("INFORMATION",response);

              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");

              const orderData = {
                products:products,
                userId:user._id, //This is additional line
                transaction_id:response.transaction.id,
                amount:response.transaction.amount
              }
              console.log("orderdata",orderData);
                createOrder(orderData);
              //TODO: empty the cart
              cartEmpty(()=>console.log("Did we got crash?"));
              //TODO: force reload
              setReload(!reload);
      })
            .catch(error => {
              setInfo({ loading: false, success: false,error:error });
              console.log("PAYMENT FAILED");
            });
          });
       };
    
  return(
            <div>
              {/* {products && products.length > 0 ?
                (<h3>Your bill is {getAmount()} $</h3>):(<h3>Add sometihng to the cart</h3>)} */}
                {showbtdropIn()}
            </div>
        )
    }
export default Paymentb;
  
