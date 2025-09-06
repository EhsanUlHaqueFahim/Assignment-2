
import mongoose from "mongoose";
let cachedConnection = null;

const connectDB = async () => {
  
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using existing MongoDB connection');
    return cachedConnection;
  }

  
  try {
    
    cachedConnection = mongoose.connect(process.env.MONGO_URI);
    
    await cachedConnection;
    console.log('✅ MongoDB connected successfully');
    
    return cachedConnection;
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error);
    
   
    cachedConnection = null;
    throw error; 
  }
}

export default connectDB;