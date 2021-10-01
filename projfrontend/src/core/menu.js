import React, {Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout, isAuthnticate } from '../auth/helper';

const currentTabs = (history,path) =>{
    if(history.location.pathname === path){
        return {color:"aqua"}
    }
    else{
        return {color:"#ffffff"}
    }
}

const menu=({history})=>{
    return(
      <div>
          <ul className="nav nav-tabs-border-none p-1 bg-dark">
              <li className="nav-item">
                  <Link style={currentTabs(history,"/")} className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link style={currentTabs(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
              </li>

              {isAuthnticate() && isAuthnticate().user.role===0 &&(
              <li className="nav-item">
                  <Link style={currentTabs(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">U. DashBoard</Link>
              </li>
              )}

              {isAuthnticate() && isAuthnticate().user.role===1 &&(
              <li className="nav-item">
                  <Link style={currentTabs(history,"/admin/dashBoard")} className="nav-link" to="/admin/dashBoard">A. DashBoard</Link>
              </li>
              )}

              {!isAuthnticate() && (
            <Fragment>
              <li className="nav-item">
                  <Link style={currentTabs(history,"/signup")} className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                  <Link style={currentTabs(history,"/signin")} className="nav-link" to="/signin">SignIn</Link>
              </li>
            </Fragment>
              )}

              {isAuthnticate() && (
                <li className="nav-item">
                    <span className="nav-link text-white" onClick={
                        ()=>{
                      signout(()=>{
                          history.push("/");
                      })
                        }
                    }>SignOut</span>
                </li> 
              )}
          </ul>
  </div>
    )
}
           
export default withRouter(menu);