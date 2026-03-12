const Product = require("../models/Product");


exports.addProduct = async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};


exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.searchProduct = async (req, res) => {

  try {

    const products = await Product.find({
      productName: { $regex: req.query.name, $options: "i" }
    });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.filterByCategory = async (req, res) => {

  try {

    const products = await Product.find({
      category: req.query.cat
    });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};