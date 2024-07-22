import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes)

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);

        mongoose.connect(process.env.MONGO_URI);

        console.log('Mongo connected');
    } catch (err) {
        console.log('err.message');
        process.exit(1)
    }
}

connectDB().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(err => console.log(err));