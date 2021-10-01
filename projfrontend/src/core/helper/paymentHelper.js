import { API } from "../../backend";

export const getmeToken = () => { 
    return fetch(`${API}/payment/gettoken`, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json"
        //Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err=> console.log(err));
  };

  export const getUser = (userId,token) => { 
    return fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err=> console.log(err));
  };
  
export const processPayment = (paymentInfo) =>{
      return fetch(`${API}/payment/braintree`,{
          method: "POST",
          headers: {
              Accept : "application/json",
              "Content-Type" : "application/json",
              //Authorization : `Bearer ${token}`
          },
          body: JSON.stringify(paymentInfo)
      }).then(response => {
        return response.json();
      })
      .catch(err=> console.log(err));
   }