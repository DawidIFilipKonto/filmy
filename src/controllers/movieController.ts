import { Request, Response } from 'express';
import Movie, { IMovie } from '../models/Movie';

export const createMovie = async (req: Request, res: Response) => {
    try {
        const { title, releaseYear, genre, director, cast, rating, description } = req.body;

        if (!title || !releaseYear) {
            return res.status(400).json({ message: 'Title and release year are required' });
        }

        const movie: IMovie = new Movie({
            title,
            releaseYear,
            genre,
            director,
            cast,
            rating,
            description
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error });
    }
};

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const { genre, year } = req.query;
        const filter: any = {};

        if (genre) filter.genre = genre;
        if (year) filter.releaseYear = year;

        const movies = await Movie.find(filter);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};