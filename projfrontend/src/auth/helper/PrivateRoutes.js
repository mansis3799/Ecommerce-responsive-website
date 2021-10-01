import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { isAuthnticate } from './index';

const PrivateRoute = ({component:Component,...rest}) =>{
    return(
    //     <Route>
    //         {...rest}
    //         render = {props =>
    //           isAuthnticate() ? (
    //               <Component {...props}/>
    //           ):(
    //               <Redirect>
    //                   to={{
    //                       pathname:"/signin",
    //                       state: {from:props.location}
    //                   }}
    //               </Redirect>
    //           )
    //         }
    //     </Route>
    // )
    <Route
      {...rest}
      render={props =>
        isAuthnticate() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;