import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @GET all products with filter, search, sort
router.get('/', async (req,res)=>{
  const { search, category, sort, featured, limit=12, page=1 } = req.query;
  let query = {};
  if(search) query.$text = { $search: search };
  if(category && category !== 'All') query.category = category;
  if(featured) query.featured = true;

  let sortOption = { createdAt: -1 };
  if(sort === 'price-asc') sortOption = { price: 1 };
  if(sort === 'price-desc') sortOption = { price: -1 };
  if(sort === 'rating') sortOption = { rating: -1 };
  if(search) sortOption = { score: { $meta: 'textScore' } };

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortOption)
    .limit(Number(limit))
    .skip((page-1)*limit);

  res.json({ products, total: count, page: Number(page), pages: Math.ceil(count/limit) });
});

router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
});

router.post('/', protect, admin, async (req,res)=>{
  const product = new Product(req.body);
  product.slug = req.body.name.toLowerCase().replace(/ /g,'-')+'-'+Date.now();
  const saved = await product.save();
  res.status(201).json(saved);
});

router.put('/:id', protect, admin, async (req,res)=>{
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', protect, admin, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.post('/:id/reviews', protect, async (req,res)=>{
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).json({ message: 'Not found' });
  const already = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if(already) return res.status(400).json({ message: 'Already reviewed' });
  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((a,r)=>a+r.rating,0)/product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

export default router;
