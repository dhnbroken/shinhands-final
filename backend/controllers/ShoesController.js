// import PostModel from "../models/postModel.js";
// import ShoesModel from '../models/shoesModel.js';
const Shoes = require('../models/Shoes');

// Add new shoes
const shoesController = {
  createShoes: async (req, res) => {
    const newShoes = new Shoes(req.body);
    const { name } = req.body;

    try {
      const oldShoes = await Shoes.findOne({ name });
      if (oldShoes) return res.status(400).json({ message: 'This shoes already existed' });

      await newShoes.save();
      res.status(200).json(newShoes);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getShoes: async (req, res) => {
    const id = req.params.id;

    try {
      const shoes = await Shoes.findById(id);
      if (shoes) {
        res.status(200).json(shoes);
      } else {
        res.status(404).json('No such Shoes');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllShoes: async (req, res) => {
    try {
      let shoes = await Shoes.find();
      shoes = shoes.filter((shoes) => {
        return shoes;
      });
      res.status(200).json(shoes);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShoes: async (req, res) => {
    const id = req.params.id;
    try {
      await Shoes.findByIdAndDelete(id);
      res.status(200).json('Shoes Deleted Successfully!');
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateShoes: async (req, res) => {
    const id = req.params.id;

    try {
      const shoes = await Shoes.findById(id);
      await shoes.updateOne({ $set: req.body });
      res.status(200).json('Shoes updated!');
    } catch (error) {}
  }
};

module.exports = shoesController;
