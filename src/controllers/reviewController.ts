import { Request, Response } from 'express';
import Review, { IReview } from '../models/Review';
import Movie from '../models/Movie';

export const createReview = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.id;
        const { author, content } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: 'Author and content are required' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const review: IReview = new Review({
            movieId,
            author,
            content
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
};

export const getReviewsByMovie = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ movieId: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

export const updateReview = async (req: Request, res: Response) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};