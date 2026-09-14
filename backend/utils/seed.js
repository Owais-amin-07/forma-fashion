import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
import Product from '../models/Product.js';
import connectDB from '../config/db.js';
await connectDB();

const products = [
  {
    name: "Linen Blend Relaxed Blazer",
    slug: "linen-blend-relaxed-blazer",
    description: "Minimal tailored blazer crafted from premium linen blend. Perfect for elevated everyday wear.",
    price: 189,
    originalPrice: 240,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507680434567-5739c80be1e1?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Women",
    countInStock: 18,
    colors: ["Sand","Black","Ivory"],
    sizes: ["XS","S","M","L"],
    rating: 4.8,
    numReviews: 34,
    featured: true,
    tags: ["blazer","linen","minimal"]
  },
  {
    name: "Oversized Wool Coat - Camel",
    slug: "oversized-wool-coat-camel",
    description: "Iconic camel coat, oversized silhouette, 100% wool. Timeless investment piece.",
    price: 320,
    originalPrice: 410,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Women",
    countInStock: 12,
    colors: ["Camel","Charcoal"],
    sizes: ["S","M","L"],
    rating: 4.9,
    numReviews: 58,
    featured: true,
    tags: ["coat","wool","camel"]
  },
  {
    name: "Essential Cotton Tee - White",
    slug: "essential-cotton-tee-white",
    description: "Heavyweight organic cotton tee with perfect drape. Minimalist wardrobe essential.",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Essentials",
    countInStock: 50,
    colors: ["White","Black","Stone"],
    sizes: ["XS","S","M","L","XL"],
    rating: 4.7,
    numReviews: 121,
    featured: false,
    tags: ["tee","cotton","basic"]
  },
  {
    name: "High-Waist Tailored Trousers",
    slug: "high-waist-tailored-trousers",
    description: "High-waist wide-leg trousers with clean front crease. Flattering and modern.",
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Women",
    countInStock: 22,
    colors: ["Black","Beige"],
    sizes: ["XS","S","M","L"],
    rating: 4.6,
    numReviews: 29,
    featured: true,
    tags: ["trousers","tailored"]
  },
  {
    name: "Men's Boxy Oxford Shirt",
    slug: "mens-boxy-oxford-shirt",
    description: "Relaxed oxford shirt in crisp cotton. Minimal design, maximal versatility.",
    price: 98,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Men",
    countInStock: 30,
    colors: ["White","Sky","Stone"],
    sizes: ["S","M","L","XL"],
    rating: 4.5,
    numReviews: 44,
    featured: false,
    tags: ["shirt","men","oxford"]
  },
  {
    name: "Leather Crossbody - Noir",
    slug: "leather-crossbody-noir",
    description: "Structured mini crossbody in full-grain leather. Designed in Paris.",
    price: 210,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Accessories",
    countInStock: 15,
    colors: ["Black","Tan"],
    sizes: ["One Size"],
    rating: 4.9,
    numReviews: 19,
    featured: true,
    tags: ["bag","leather","minimal"]
  },
  {
    name: "Silk Slip Dress - Ecru",
    slug: "silk-slip-dress-ecru",
    description: "Fluid 100% silk slip dress. Bias cut for beautiful movement.",
    price: 265,
    originalPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3c67ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Women",
    countInStock: 8,
    colors: ["Ecru","Black"],
    sizes: ["XS","S","M","L"],
    rating: 4.8,
    numReviews: 22,
    featured: true,
    tags: ["dress","silk"]
  },
  {
    name: "Men's Relaxed Cargo Pants",
    slug: "mens-relaxed-cargo-pants",
    description: "Minimal cargo pants with clean pockets. Cotton ripstop.",
    price: 128,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Men",
    countInStock: 26,
    colors: ["Olive","Sand","Black"],
    sizes: ["S","M","L","XL"],
    rating: 4.6,
    numReviews: 31,
    featured: false,
    tags: ["cargo","men"]
  },
  {
    name: "Wool Cashmere Scarf",
    slug: "wool-cashmere-scarf",
    description: "Ultra-soft wool-cashmere blend scarf, oversized. Nordic minimalism.",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Accessories",
    countInStock: 40,
    colors: ["Grey","Camel","Ivory"],
    sizes: ["One Size"],
    rating: 4.7,
    numReviews: 17,
    featured: false,
    tags: ["scarf","accessory"]
  },
  {
    name: "New In - Cropped Knit Cardigan",
    slug: "cropped-knit-cardigan",
    description: "Soft cropped cardigan with mother-of-pearl buttons. Fall essential.",
    price: 118,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"
    ],
    category: "New In",
    countInStock: 20,
    colors: ["Cream","Black","Mocha"],
    sizes: ["XS","S","M","L"],
    rating: 4.8,
    numReviews: 27,
    featured: true,
    tags: ["knit","new"]
  },
  {
    name: "Ribbed Merino Turtleneck",
    slug: "ribbed-merino-turtleneck",
    description: "Fine merino knit with a softly sculpted fit for layering.",
    price: 110,
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"],
    category: "Essentials",
    countInStock: 24,
    colors: ["Oat","Black"],
    sizes: ["XS","S","M","L"],
    rating: 4.7,
    numReviews: 18,
    featured: false,
    tags: ["knit","merino"]
  },
  {
    name: "Pleated Everyday Skirt",
    slug: "pleated-everyday-skirt",
    description: "Fluid pleated skirt designed to move from morning to evening.",
    price: 142,
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a13d27?q=80&w=800&auto=format&fit=crop"],
    category: "New In",
    countInStock: 16,
    colors: ["Stone","Black"],
    sizes: ["XS","S","M","L"],
    rating: 4.6,
    numReviews: 12,
    featured: true,
    tags: ["skirt","new"]
  },
  {
    name: "Minimal Leather Loafers",
    slug: "minimal-leather-loafers",
    description: "Polished leather loafers with a softly squared toe.",
    price: 175,
    images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop"],
    category: "Accessories",
    countInStock: 14,
    colors: ["Black","Cognac"],
    sizes: ["36","37","38","39","40"],
    rating: 4.8,
    numReviews: 21,
    featured: false,
    tags: ["shoes","leather"]
  },
  {
    name: "Organic Cotton Overshirt",
    slug: "organic-cotton-overshirt",
    description: "Structured organic cotton overshirt for relaxed, considered layering.",
    price: 125,
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6b2f?q=80&w=800&auto=format&fit=crop"],
    category: "Men",
    countInStock: 19,
    colors: ["Stone","Navy"],
    sizes: ["S","M","L","XL"],
    rating: 4.6,
    numReviews: 15,
    featured: false,
    tags: ["shirt","cotton"]
  }
];

await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products`);
process.exit();
