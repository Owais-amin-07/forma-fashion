import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req,res)=> res.json({ message: 'FORMA FASHION API - Minimalist E-Commerce', status: 'running' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

// ---- VERCEL FIX ----
// Vercel needs export, local needs listen
export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  const tryListen = (port) => {
    const server = app.listen(port, () => console.log(`✅ FORMA API running on port ${port}`));
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${port} busy, trying ${port + 1}`);
        tryListen(port + 1);
      }
    });
  };
  tryListen(Number(PORT));
}
