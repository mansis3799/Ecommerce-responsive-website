import {API} from "../../backend";//API means http://localhost:8000/api

export const signup = user =>{
     return fetch(`${API}/signup`,{
         method:"POST",
         body:JSON.stringify(user),
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
         }
     })
     .then(res=>{
         return res.json();
     })
     .catch(err=>console.log(err));
}

export const contactme = (contact) =>{
    return fetch(`${API}/contactme`,{
        method:"POST",
        body:JSON.stringify(contact),
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const signin = user =>{
    return fetch(`${API}/signin`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
}

export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
            method:"GET"
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err));
  }
}

export const isAuthnticate = () =>{
   if(typeof window == "undefined"){
       return false;
   }
   if(localStorage.getItem("jwt")){
       return JSON.parse(localStorage.getItem("jwt"));
   }
   else{
       return false;
   }
}

