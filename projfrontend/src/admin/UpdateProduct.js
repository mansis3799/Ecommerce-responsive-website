import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategory,getProduct,updateProduct } from "./helper/adminapicall";
import { isAuthnticate } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthnticate();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    success:"",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const { name,description,price,stock,categories,category,loading,error,createdProduct,getaRedirect,formData } = values;

  const preload = (productId) => {
    getProduct(productId).then(data => {
       console.log("DATA",data);
       console.log("DATA Name",data.name);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data && data.name,
          description: data && data.description,
          price: data && data.price,
          category: data && data.category,
          stock: data && data.stock,
          formData: new FormData()
        });
      }     
    });
   };

  const preloadCategories = () => {
    getAllCategory().then(data => {
      console.log("CATEGORIES",data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      data => {
        console.log("DATA",data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          });
        }
      }
    );
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3 p-2"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h5>{createdProduct} updated successfully</h5>
    </div>
  );

  const createProductForm = () => (
    <form>
      {/* <span>Post photo</span> */}
      <div className="form-group mt-2">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control m-2"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control m-2"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control m-2"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control m-2"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>{cate.name}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control m-2"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button  type="submit"  onClick={onSubmit}  className="btn m-1 btn-outline-info rounded mb-3">Update Product</button>
    </form>
  );

  return (
    <Base
      title="Update the product here!"
      description="Welcome to product updation section"
      className="container rounded p-4 mb-2"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-danger text-light rounded mb-3">Admin Home</Link>
      <div className="row bg-dark text-white pt-2 pb-2 rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};  

export default UpdateProduct;
