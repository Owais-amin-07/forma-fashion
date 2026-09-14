import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: genToken(user._id) });
});

router.post('/login', async (req,res)=>{
  const { email: identifier, password } = req.body;
  if(!identifier || !password || password.length < 6) return res.status(400).json({ message: 'Enter an identifier and a password of at least 6 characters' });
  const email = identifier.includes('@') ? identifier.toLowerCase().trim() : `${identifier.toLowerCase().trim().replace(/[^a-z0-9._-]/g, '')}@forma.local`;
  let user = await User.findOne({ email });
  if(!user){
    user = await User.create({ name: identifier.split('@')[0].trim() || 'Forma customer', email, password });
  }
  if(user && await user.matchPassword(password)){
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: genToken(user._id) });
  } else res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/me', protect, async (req,res)=>{
  res.json(req.user);
});

export default router;
