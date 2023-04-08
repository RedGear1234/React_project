import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const collectData = async () => {
    let result = await fetch(
      `https://amazing-croissant-e1a7ca.netlify.app/signup`,
      {
        method: "POST",
        body: JSON.stringify({ Name, Email, Password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };

  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container_signUp">
      <div className="SignUp">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={Name}
        />
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          validate="true"
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
        />
        <button className="sign_up_btn" onClick={collectData}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
