import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default database;

