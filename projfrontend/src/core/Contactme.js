import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { contactme } from "../auth/helper/index";
import Base from "./Base";

export default function Contactme() {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        error: "",
        success: false
      });

    const {firstname,lastname,email,message,error,success} = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        contactme({ firstname,lastname,email,message })
          .then(data => {
            console.log("data",data);
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                firstname: "",
                lastname: "",
                email: "",
                message: "",
                error: "",
                success: true
              });
            }
          })
          .catch(err =>{
              console.log(err);
          });
      };

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                Your form is submitted successfully.
                <Link to="/">Go to home page</Link>
              </div>
            </div>
          </div>
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
      <Base title="Contact Us" description="We are here to help for you">
          {successMessage()}
          {errorMessage()}
        <div>
            <h2 className="text-center text-light">Please fill out our contact form</h2>
            <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              {/* <label className="text-light">First Name</label> */}
              <input
                type="text"
                className="form-control m-3"
                onChange={handleChange("firstname")}
                value={firstname}
                placeholder="Enter your name here"
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Last Name</label> */}
              <input
                className="form-control m-3"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
                placeholder="Enter your last name here"
              />
            </div>
            <div className="form-group">
              {/* <label className="text-light">Email</label> */}
              <input
                className="form-control m-3"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Enter your email here"
              />
            </div>

            <div className="form-group">
              {/* <label className="text-light">Message</label> */}
              <textarea className="form-control m-3" onChange={handleChange("message")} id="exampleFormControlTextarea1" rows="3" type="text" value={message} placeholder="Enter your message here"></textarea>
            </div>

            <button onClick={onSubmit} className="btn btn-outline-info rounded text-center btn-block m-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </Base>
    )
}

