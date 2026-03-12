const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MongoDB Connection ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


/* ---------------- Product Schema ---------------- */

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true
  },

  productCode: {
    type: String,
    required: true,
    unique: true
  },

  category: String,

  supplierName: {
    type: String,
    required: true
  },

  quantityInStock: {
    type: Number,
    min: 0
  },

  reorderLevel: {
    type: Number,
    min: 1
  },

  unitPrice: {
    type: Number,
    min: 0
  },

  manufactureDate: Date,

  productType: {
    type: String,
    enum: ["Perishable", "Non-Perishable"]
  },

  status: {
    type: String,
    default: "Available"
  }

});

const Product = mongoose.model("Product", productSchema);


/* ---------------- Routes ---------------- */


/* Add Product */

app.post("/api/products", async (req,res) => {

  try{

    const product = await Product.create(req.body);

    res.status(201).json(product);

  }catch(err){

    res.status(400).json({message: err.message});

  }

});


/* Get All Products */

app.get("/api/products", async (req,res)=>{

  try{

    const products = await Product.find();

    res.status(200).json(products);

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Search Product ---------------- */

app.get("/api/products/search", async (req,res)=>{

  try{

    const products = await Product.find({
      productName: { $regex: req.query.name, $options: "i" }
    });

    res.status(200).json(products);

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Filter Category ---------------- */

app.get("/api/products/category", async (req,res)=>{

  try{

    const products = await Product.find({
      category: req.query.cat
    });

    res.status(200).json(products);

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Get Product by ID ---------------- */

app.get("/api/products/:id", async (req,res)=>{

  try{

    const product = await Product.findById(req.params.id);

    if(!product)
      return res.status(404).json({message:"Product not found"});

    res.status(200).json(product);

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Update Product ---------------- */

app.put("/api/products/:id", async (req,res)=>{

  try{

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json(product);

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Delete Product ---------------- */

app.delete("/api/products/:id", async (req,res)=>{

  try{

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({message:"Product deleted"});

  }catch(err){

    res.status(500).json({message: err.message});

  }

});


/* ---------------- Base Route ---------------- */

app.get("/", (req,res)=>{

  res.send("Store Inventory API Running");

});


/* ---------------- Start Server ---------------- */

const PORT = process.env.PORT || 5055;

app.listen(PORT, ()=>{

  console.log(`Server running on port ${PORT}`);

});