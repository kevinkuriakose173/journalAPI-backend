import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({ orgin: true, credentials: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes);

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