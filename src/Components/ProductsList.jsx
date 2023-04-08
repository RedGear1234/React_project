import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tshirt from "./assets/tshirt.png";

const ProductsList = () => {
  const [products, setproducts] = useState([""]);

  const GetProducts = async () => {
    let result = await fetch(`http://localhost:3000/products`,{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setproducts(result);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:3000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      GetProducts();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setproducts(result);
      }
    } else {
      GetProducts();
    }
  };

  return (
    <div className="conatiner-ProductsList">
      <div className="banner">
        <h1>Nothing Matters.</h1>
      </div>
      <div className="product-List">
        <input
          type="text"
          placeholder="Search Prodcuts "
          className="search_bar"
          onChange={handleSearch}
        />
      
        {products.length > 0 ? (
          products.map((item, index) => {
            return (
              
              <ul key={index} className="ul-products">
                <div className="ul-Image-div">
                  <img src={tshirt} alt="img" />
                </div>
                <li className="li-products">
                  <h1>{item.name}</h1>
                </li>
                <li className="li-products">
                  <h2>{item.price}$</h2>
                </li>
                <li className="li-products">
                  <h4>{item.category}</h4>
                </li>
                <li className="li-products">
                  <p>{item.company}</p>
                </li>
                <li>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    ❌
                  </button>
                </li>
                <Link className="update" to={`/update/${item._id}`}>
                  ✍
                </Link>
              </ul>
            );
          })
        ) : (
          <h1>Nothing is here ?</h1>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
