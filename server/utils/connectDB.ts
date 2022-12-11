import mongoose from 'mongoose';

const localURI = process.env.MONGODB_LOCAL_URI as string;

const connection: any = {};

export const connectDB = async () => {
    if (connection.isConnected) {
        console.log('DB is already connected');
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(localURI);
    console.log('? MongoDB Database Connected Successfully');
    connection.isConnected = db.connections[0].readyState;
};

export const disconnectDB = async () => {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not discounted');
        }
    }
};
