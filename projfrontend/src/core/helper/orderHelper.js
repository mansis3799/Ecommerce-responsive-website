import { API } from "../../backend";

export const createOrder = (orderData) =>{
    console.log("ORDERDATA",orderData);
    return fetch(`${API}/order/create`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            //Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({order:orderData})
    }).then(res =>{
        return res.json();
    })
    .catch(err =>{
        console.log(err);
    })
}