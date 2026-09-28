import mongoose from 'mongoose';
import Product from './models/product.model.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/shopkart';

const sampleProducts = [
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue tactile switches.',
    price: 2999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 10
  },
  {
    name: 'Noise Cancelling Headphones',
    description: 'Wireless over-ear headphones with active noise cancellation.',
    price: 4999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 25
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Premium blue denim jacket for everyday wear.',
    price: 1999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    stock: 15
  },
  {
    name: 'Clean Code Book',
    description: 'A handbook of agile software craftsmanship by Robert C. Martin.',
    price: 799,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    stock: 50
  }
];

mongoose.connect(MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Sample products seeded successfully!');
  process.exit();
});