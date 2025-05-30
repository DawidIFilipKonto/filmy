import { Router, Request, Response, NextFunction } from 'express';
import {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from '../controllers/movieController';

const router = Router();


type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response>;


const asyncHandler = (fn: AsyncRequestHandler) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };


router.post('/', asyncHandler(async (req, res) => {
    await createMovie(req, res);
}));

router.get('/', asyncHandler(async (req, res) => {
    await getAllMovies(req, res);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    await getMovieById(req, res);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    await updateMovie(req, res);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    await deleteMovie(req, res);
}));

export default router;