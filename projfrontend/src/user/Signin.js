import React,{useState} from 'react';
import Base from '../core/Base';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthnticate} from '../auth/helper';

  const Signin = ()=>{
      const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
      });

  const {email, password, error, loading, didRedirect } = values;
  const {user} = isAuthnticate();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading:true });
    signin({ email, password })
    .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data,()=>{
          setValues({
            ...values,
            didRedirect: true
          })
         })
        }
      })
      .catch(err =>{
        console.log(err)
      });
  };

const performRedirect = ()=>{
  if(didRedirect){
    if(user && user.role===1){
      return <Redirect to="/admin/dashboard" />;
    }
    else{
      return <Redirect to="/user/dashboard" />;
    }
  }
  if(isAuthnticate()){
    return <Redirect to="/"/>;

  }
}

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <input
                className="form-control m-3"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Enter your email here"
              />
            </div>

            <div className="form-group">
              {/* <label className="text-light">Password</label> */}
              <input
                onChange={handleChange("password")}
                className="form-control m-3"
                type="password"
                value={password}
                placeholder="Enter your password here"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-outline-info m-2 btn-block text-center rounded">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
          <div className="alert alert-success"><h4>Loading....</h4></div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

    return(
      <Base title="Signin page" description="A page for user to signin!">
          {/* <h2>Signin works...</h2> */}
          {loadingMessage()}
          {errorMessage()}
          {signInForm()}
          {performRedirect()}
          {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
      </Base>
    );
};
export default Signin;