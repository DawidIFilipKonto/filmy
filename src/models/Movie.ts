import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    releaseYear: number;
    genre?: string;
    director?: string;
    cast?: string[];
    rating?: number;
    description?: string;
}

const movieSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: String,
    director: String,
    cast: [String],
    rating: Number,
    description: String
});

export default model<IMovie>('Movie', movieSchema);