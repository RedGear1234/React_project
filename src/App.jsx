import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./Components/PrivateComonents";
import UpdateProduct from "./Components/UpdateProduct";
import ProductsList from "./Components/ProductsList";
import AddProducts from "./Components/AddProducts";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Login from "./Components/login";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/*  Private Components Start  */}
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<ProductsList />}></Route>
              <Route path="/add" element={<AddProducts />}></Route>
              <Route path="/update/:id" element={<UpdateProduct />}></Route>
              <Route path="/logout"></Route>
            </Route>
            {/* Private Components End  */}
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
