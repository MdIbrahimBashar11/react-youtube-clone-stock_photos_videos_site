import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="col-md-4">
      <Link className="navbar-brand" to='/'><h2>Stocker</h2></Link>
      </div>
      <div className="col-md-8">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" 
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to='/'>Youtube Videos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/image'>Stock Photos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/video'>Stock Videos</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to='/dow'>Video Download</Link>
        </li>
        </ul>
      </div>
      </div>
    </nav>
      </div>
    </div>
    
  );
};

export default Navbar;
