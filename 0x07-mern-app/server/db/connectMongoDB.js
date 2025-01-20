import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB connected:  ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connectMongoDB.js ${error.message}`);
        process.exit(1);
    }
}


export default connectMongoDB
