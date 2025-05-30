import mongoose from 'mongoose';
import Movie from './models/Movie';
import Review from './models/Review';
import 'dotenv/config';

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);


        await Movie.deleteMany({});
        await Review.deleteMany({});


        const movie1 = await Movie.create({
            title: "Inception",
            releaseYear: 2010,
            genre: "Sci-Fi",
            director: "Christopher Nolan",
            rating: 8.8
        });

        const movie2 = await Movie.create({
            title: "The Shawshank Redemption",
            releaseYear: 1994,
            genre: "Drama",
            rating: 9.3
        });


        await Review.create([
            {
                movieId: movie1._id,
                author: "Jan Kowalski",
                content: "Niesamowity film, polecam!"
            },
            {
                movieId: movie1._id,
                author: "Anna Nowak",
                content: "Skomplikowana fabuła, ale warto."
            }
        ]);

        console.log("Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();