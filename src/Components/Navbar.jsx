import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

   const logout =() =>{
    localStorage.clear()
    navigate('/signup')
   }

  return (
    <div className="nav">
      <ul className="nav-ul">
        <div className="Logo">
          <Link to="/" id="Link_logo">
            <h1>Simple</h1>
          </Link>
        </div>
        <li className="nav-li">
          {auth ? (
            <>
              <Link to="/" className="Links">
                Products
              </Link>
              <Link to="/add" className="Links">
                Add Products
              </Link>
              <Link to="/signup" className="Links" onClick={logout}>
                Logout{" "}
                <span className="userName">{JSON.parse(auth).Email}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="Links">
                Sign In
              </Link>
              <Link to="/signup" className="Links">
                Sign Up
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
