import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB connected:  ${conn.connection.host}`);
  } catch (error) {
    // Since 'error' is of type 'unknown', we need to check if it's an instance of Error
    if (error instanceof Error) {
      console.log(`Error in connectMongoDB.js ${error.message}`);
      process.exit(1);
    } else {
      console.log("Unknown error in connectMongoDB.js");
    }
  }
};

export default connectMongoDB;
