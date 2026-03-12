const mongoose = require("mongoose");

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

  category: {
    type: String,
    required: true
  },

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

module.exports = mongoose.model("Product", productSchema);