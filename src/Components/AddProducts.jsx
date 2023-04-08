import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const AddProducts = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate()

  const handleprodcuts = async () => {
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:3000/add-product`, {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    navigate('/')
  };

  return (
    <div className="container-product">
      <div className="Product">
        <h1>
          Add <span className="prod-name">Products</span>{" "}
        </h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="inputBox"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        {error && !name && <span className="validate">Enter Valid Name</span>}
        <input
          type="text"
          placeholder="Enter Product Price"
          className="inputBox"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
        {error && !price && <span className="validate">Enter Valid Price</span>}
        <input
          type="text"
          placeholder="Enter Product Category"
          className="inputBox"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        {error && !category && (
          <span className="validate">Enter Valid Category</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Company"
          className="inputBox"
          onChange={(e) => setcompany(e.target.value)}
          value={company}
        />
        {error && !company && (
          <span className="validate">Enter Valid Company Name</span>
        )}
        <button className="product-btn" onClick={handleprodcuts}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
