import mongoose from 'mongoose';

import { MONGODB_URI } from '@constants';

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

const connection: any = {};
export async function connectDB() {
    if (connection.isConnected) {
        console.log('use previous connection');
        return;
    }

    const db = await mongoose.connect(MONGODB_URI);
    console.log('🚀 MongoDB Database Connected Successfully');
    connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
