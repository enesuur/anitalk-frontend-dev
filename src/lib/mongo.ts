import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) return;

  const dbURI = process.env.MONGODB_URI;

  try {
    mongoose.connection.on('connecting', () => {
      console.log('🔄 MongoDB connecting...');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected!');
    });

    mongoose.connection.on('open', () => {
      console.log('📡 MongoDB connection open.');
    });

    mongoose.connection.on('disconnecting', () => {
      console.log('⚠️ MongoDB disconnecting...');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('❌ MongoDB disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('♻️ MongoDB reconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🚨 MongoDB connection error:', err);
    });

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error('❗ Failed to connect to MongoDB:', error);
  }
};

export default connectToDatabase;
