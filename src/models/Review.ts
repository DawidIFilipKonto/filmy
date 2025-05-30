import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
    movieId: Schema.Types.ObjectId;
    author: string;
    content: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<IReview>('Review', reviewSchema);