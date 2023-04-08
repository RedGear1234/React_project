require("./db/config");
const express = require("express");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();
app.use(express.json());

const Jwt = require("jsonwebtoken");
const jwtKey = "ecomm";

const cors = require('cors');

// allow requests from your React app's domain
const corsOptions = {
  origin: "https://amazing-croissant-e1a7ca.netlify.app",
};
app.use(cors(corsOptions));

// ---------------------------------------------------------------------------------------------

// LOGIN ----
app.post(
  "https://amazing-croissant-e1a7ca.netlify.app/login",
  async (req, res) => {
    if (req.body.Password && req.body.Email) {
      let user = await User.findOne(req.body).select("-Password");
      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send({ result: "No User Found!!" });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "No User Found!!" });
      }
    }
  }
);

// LOGIN API END ----

//  Sign up Api Start  --

app.post(
  "https://amazing-croissant-e1a7ca.netlify.app/signup",
  async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.Password;

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "No User Found!!" });
      }
      res.send({ result, auth: token });
    });
  }
);

// Sign up Api End --

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "NO Products Found!!" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found!!" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result)
});

// MIDDLEWARE --------------------------------------------------------------------

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please Add Vaild Token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please Add Token With Header" });
  }
}
// ---------------------------------------------------------------------------------------

app.listen(3000, () => {
  console.log(`Backend is Working on 3000`);
});
