import mongoose from 'mongoose';
const connectDB = async () => {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  uri = uri.replace(/^["']|["']$/g, '').trim();
  if (!uri.includes('/forma-fashion')) {
    uri = uri.includes('?') ? uri.replace('?', '/forma-fashion?') : uri + '/forma-fashion?retryWrites=true&w=majority';
  }
  const conn = await mongoose.connect(uri);
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};
export default connectDB;