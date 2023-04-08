import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handlelogin = async () => {
    let result = await fetch(
      `https://6431c779a308c16bacb30c8a--amazing-croissant-e1a7ca.netlify.app/signup`,
      {
        method: "post",
        body: JSON.stringify({ Email, Password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Incorrect Details");
    }
  };

  return (
    <div className="container_signIn">
      <div className="SignIn">
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
        />
        <button className="sign_in_btn" onClick={handlelogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
