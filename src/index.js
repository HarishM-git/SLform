const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
require('dotenv').config()

const templatePath = path.join(__dirname, "../templates");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  console.log("Signup POST request received:", req.body); // Add this line
  const data = {
    name: req.body.name ? req.body.name.trim() : '',
    password: req.body.password ? req.body.password.trim() : ''
  };
  
  if (!data.name || !data.password) {
    return res.status(400).send("Name and password are required.");
  }

  try {
    await collection.insertMany([data]);
    res.render("home"); 
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred during signup");
  }
});

app.post("/login", async (req, res) => {
  console.log("Login POST request received:", req.body); // Add this line
  const userName = req.body.name ? req.body.name.trim() : '';
  const userPass = req.body.password ? req.body.password.trim() : '';

  if (!userName || !userPass) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    const check = await collection.findOne({ name: userName });
    
    if (check && check.password === userPass) {
      res.render("home"); 
    } else {
      res.send("Wrong username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Port connected");
});
