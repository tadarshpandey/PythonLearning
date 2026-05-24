import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const forceInMemory = process.env.FORCE_IN_MEMORY === 'true';

  if (!mongoUri || forceInMemory) {
    console.log('----------------------------------------------------');
    console.log('⚡ NOTICE: No MONGO_URI provided or FORCE_IN_MEMORY=true.');
    console.log('   ZenTask is running in IN-MEMORY MOCK MODE.');
    console.log('   All data is stored in the server memory.');
    console.log('   (To connect to MongoDB, add MONGO_URI in backend/.env)');
    console.log('----------------------------------------------------');
    isConnected = false;
    return false;
  }

  try {
    // ----------------------------------------------------------------
    // SECTION: MONGODB CONNECTION CODE
    // ----------------------------------------------------------------
    console.log('🔄 Attempting connection to MongoDB...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    // ----------------------------------------------------------------
    
    isConnected = true;
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log('----------------------------------------------------');
    console.log('⚠️ FALLBACK: Falling back to IN-MEMORY MOCK MODE.');
    console.log('   All data operations will be stored in server memory.');
    console.log('----------------------------------------------------');
    isConnected = false;
    return false;
  }
};

// Helper function to check if database operations are active
export const isDbActive = () => {
  return isConnected;
};
