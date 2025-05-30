import mongoose from 'mongoose';
import Movie from '../models/Movie';
import Review from '../models/Review';

const initDatabase = async () => {
    try {

        await mongoose.connect('mongodb://localhost:27017/movieDB');

        await Movie.deleteMany({});
        await Review.deleteMany({});

        const movies = await Movie.insertMany([
            {
                title: "Inception",
                releaseYear: 2010,
                genre: "Sci-Fi",
                director: "Christopher Nolan",
                cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
                rating: 8.8,
                description: "A thief who steals corporate secrets through the use of dream-sharing technology."
            },
            {
                title: "The Shawshank Redemption",
                releaseYear: 1994,
                genre: "Drama",
                director: "Frank Darabont",
                cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
                rating: 9.3,
                description: "Two imprisoned men bond over a number of years."
            }
        ]);

        await Review.insertMany([
            {
                movieId: movies[0]._id,
                author: "Jan Kowalski",
                content: "Niesamowity film, polecam!",
                createdAt: new Date()
            },
            {
                movieId: movies[0]._id,
                author: "Anna Nowak",
                content: "Skomplikowana fabuła, ale warto.",
                createdAt: new Date()
            },
            {
                movieId: movies[1]._id,
                author: "Tomasz Wiśniewski",
                content: "Najlepszy film wszech czasów!",
                createdAt: new Date()
            }
        ]);

        console.log("Database initialized successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
};

initDatabase();