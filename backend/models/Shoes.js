const mongoose = require('mongoose');

const shoesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    salePercents: { type: Number },
    brands: String,
    category: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shoes', shoesSchema);
