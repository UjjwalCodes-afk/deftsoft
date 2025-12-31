import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';
export const register = async(req,res) => {
    const {name, email, password, age} = req.body;
    if(!name || !email || !password || !age){
        return res.status(400).json({message : "Please enter all fields"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        name,
        email,
        password : hashedPassword,
        age
    });
    await newUser.save();
    res.status(201).json({message : 'User is created', newUser});
}

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  
    res.json({ token });
  };
  

