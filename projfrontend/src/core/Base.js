import React from 'react';
import Menu from './menu';
import { Link } from 'react-router-dom';

export default function Base(
    {   
        title="My title",
        description="My description",
        className="text-white p-4",
        children
    }
){
  return (
    <div>
        <Menu />
      <div className="container-fluid">
          <div className="jumbotron text-white text-center">
              <h2 className="colour display-5">{title}</h2>
              <p className="colour lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
      </div>
      <footer className="footer text-white">
          <div className="container-fluid bg-dark text-white text-center py-2">
              <h6>Copyright <span>&copy;</span> 2021-All rights reserved</h6>
              <button className="btn bg-info btn-sm rounded">
              <Link className="text-decoration-none text-dark" to="/contactme">Contact Me</Link>
              </button>
          </div>
          <div className="container m-0 p-0">
              <span className="text-muted">
                Have <span className="text-white">amazing</span> experience!!        
              </span>
          </div>
      </footer>
    </div>
  );
}
