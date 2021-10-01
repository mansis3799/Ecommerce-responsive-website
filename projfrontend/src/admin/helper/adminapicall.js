import {API} from "../../backend";//API means http://localhost:8000/api

export const createCategory = (userId,token,category) => {
     return fetch(`${API}/category/create/${userId}`,{
         method:"POST",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json",
             Authorization : `Bearer ${token}`
         },
         body:JSON.stringify(category)
     })
     .then(res=>{
         return res.json();
     })
     .catch(err=>console.log(err));
}

export const getAllCategory = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const deleteCategory = (categoryId,userId,token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization : `Bearer ${token}`
        },
        body:product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const getAllProduct = () =>{
    return fetch (`${API}/products`,{
    method:"GET"
    })
   .then(res=>{
       return res.json();
    })
    .catch(err=>console.log(err));
}

export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const deleteOrder = (orderId,userId,token) => {
    return fetch(`${API}/order/${orderId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};

  export const updateProduct = (productId, userId, token, product) => {
    console.log("Nitesh is awesome",product);
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization : `Bearer ${token}`
        },
        body:product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
      method: "GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
};

export const updateCategory = (categoryId,userId,token,name) => {
    console.log("Nitesh is awesome",name);
    return fetch(`http://localhost:8000/api/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        //body: JSON.stringify(name) //This way is wrong
        body: JSON.stringify({name})
    })
    .then(res=>{
        console.log("RESPONSE",res);
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const getAllOrders = () => {
    return fetch(`${API}/order/all`,{
        method:"GET"
    })
    .then(res=>{
        console.log("ORDERS",res);
        return res.json();
    })
  .catch(err=>console.log(err));
}

export const getOrderStatus = (orderId) => {
    // console.log("orderId",orderId);
    return fetch(`${API}/order/status/${orderId}`, {
      method: "GET",
    })
    .then(res=>{
        // console.log("Order",res);
        return res.json();
    })
    .catch(err=>console.log(err));
};

export const updateStatus = (orderId, userId, token, status) => {
    console.log("status",status);
    return fetch(`${API}/order/status/${orderId}/${userId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify({status})
    })
    .then(res=>{
        console.log("res",res);
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const getOrder = (orderId) => {
    // console.log("ORDERID",orderId);
    return fetch(`${API}/order/${orderId}`, {
      method: "GET"
    })
    .then(res=>{
        console.log("res",res);
        return res.json();
    })
    .catch(err=>console.log(err));
};

export const userPurchaseList = (userId,token) => {
    console.log("USERID ",userId);
    return fetch(`${API}/orders/user/${userId}`, {
      method: "GET",
      headers:{
                "Content-Type": "application/json",
                // Accept:"application/json",
                "Authorization" : `Bearer ${token}`
            }
    })
    .then(res=>{
        console.log("Purchase list",res);
        return res.json();
    })
    .catch(err=>console.log(err));
};

export const OrderProductList = (orderId,userId) => {
    console.log("USERID ",userId);
    return fetch(`${API}/orders/${userId}/${orderId}`, {
      method: "GET"
    })
    .then(res=>{
        console.log("Product list",res);
        return res.json();
    })
    .catch(err=>console.log(err));
};


  