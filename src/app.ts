import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRoutes';
import reviewRoutes from './routes/reviewRoutes';
import 'dotenv/config';


const app = express();


app.use(cors());
app.use(express.json());


app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);


const MONGODB_URI = 'mongodb://localhost:27017/movieDB';


mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

export default app;