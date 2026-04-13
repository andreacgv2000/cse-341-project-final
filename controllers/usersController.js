const Model = require('../models/usersModel');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const data = await Model.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = new Model(req.body);
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const data = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const data = await Model.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};