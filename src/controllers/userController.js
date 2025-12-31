import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async(req,res) => {
    const {name,email,password,age} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name,email, password : hashedPassword, age});
    res.status(201).json({message : "User created", user});
}

export const getUsers = async(req,res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const users = await User.aggregate([
        {$project : {password : 0}},
        {$skip : skip},
        {$limit : limit}
    ]);
    
  res.json({ page, limit, users });
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
  
    res.json(user);
};

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};
  
  
  