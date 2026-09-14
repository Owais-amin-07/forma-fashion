import express from 'express';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req,res)=>{
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if(!orderItems || orderItems.length===0) return res.status(400).json({ message: 'No items' });
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice, shippingPrice, taxPrice, totalPrice
  });
  const created = await order.save();
  res.status(201).json(created);
});

router.get('/my', protect, async (req,res)=>{
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get('/:id', protect, async (req,res)=>{
  const order = await Order.findById(req.params.id).populate('user','name email');
  if(!order) return res.status(404).json({ message: 'Not found' });
  if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Not allowed' });
  res.json(order);
});

router.get('/', protect, admin, async (req,res)=>{
  const orders = await Order.find({}).populate('user','name').sort({ createdAt: -1 });
  res.json(orders);
});

router.put('/:id/pay', protect, async (req,res)=>{
  const order = await Order.findById(req.params.id);
  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { id: req.body.id||'cod', status: 'Completed' };
    order.status = 'Processing';
    await order.save();
    res.json(order);
  } else res.status(404).json({ message: 'Order not found' });
});

router.put('/:id/status', protect, admin, async (req,res)=>{
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  if(req.body.status === 'Delivered'){ order.isDelivered = true; order.deliveredAt = Date.now(); }
  await order.save();
  res.json(order);
});

export default router;
