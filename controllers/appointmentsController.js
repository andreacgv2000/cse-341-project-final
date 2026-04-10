const Model = require('../models/appointmentsModel');
const mongoose = require('mongoose');

exports.getAll = async (req,res)=>{
  try{ res.json(await Model.find()); }
  catch(e){ res.status(500).json({message:e.message}); }
};

exports.getById = async (req,res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({message:'Invalid ID'});
  const data = await Model.findById(req.params.id);
  if(!data) return res.status(404).json({message:'Not found'});
  res.json(data);
};

exports.create = async (req,res)=>{
  try{
    const data = new Model(req.body);
    res.status(201).json(await data.save());
  }catch(e){ res.status(400).json({message:e.message}); }
};

exports.update = async (req,res)=>{
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(data);
};

exports.delete = async (req,res)=>{
  await Model.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});
};