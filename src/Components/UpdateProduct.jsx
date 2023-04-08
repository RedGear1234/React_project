import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    let result = await fetch(`http://localhost:3000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    navigate("/");
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
  };

  return (
    <div className="container-product">
      <div className="Product">
        <h1>
          Update <span className="prod-name">Products</span>{" "}
        </h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="inputBox"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Enter Product Price"
          className="inputBox"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
        <input
          type="text"
          placeholder="Enter Product Category"
          className="inputBox"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />

        <input
          type="text"
          placeholder="Enter Product Company"
          className="inputBox"
          onChange={(e) => setcompany(e.target.value)}
          value={company}
        />

        <button className="product-btn" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
