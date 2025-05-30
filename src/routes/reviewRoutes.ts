import { Router } from 'express';
import {
    createReview,
    getReviewsByMovie,
    updateReview,
    deleteReview
} from '../controllers/reviewController';

const router = Router();


router.post('/movies/:id/reviews', async (req, res, next) => {
    try {
        await createReview(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/movies/:id/reviews', async (req, res, next) => {
    try {
        await getReviewsByMovie(req, res);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await updateReview(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await deleteReview(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;