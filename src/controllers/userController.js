import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
      const { name, email, password, age } = req.body;
  

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required"
        });
      }
  

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age
      });
  
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          age: user.age
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

  export const getUsers = async (req, res) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.max(Number(req.query.limit) || 5, 1);
      const skip = (page - 1) * limit;
  
      const users = await User.aggregate([
        { $project: { password: 0 } },
        { $skip: skip },
        { $limit: limit }
      ]);
  
      res.json({
        page,
        limit,
        count: users.length,
        users
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const user = await User.findById(id).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};
  

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, age } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const updateData = {};
  
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (age) updateData.age = age;

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
  
      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        message: "User updated successfully",
        user
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  