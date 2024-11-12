"use client";
import { useState } from "react";
import MovieList from "./MovieList";
import MovieActingList from "./MovieActingList";
import MovieDetailsModal from "./MovieDetailsModal";

const ActorWorks = ({ actor }) => {
    const [showFullBiography, setShowFullBiography] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieDetailClick = (movie) => {
        setSelectedMovie(movie);
    };


    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-gray-100 dark:text-gray-900">
                {actor.name}
            </h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-900">Biography</h2>
                <p className="text-gray-300 dark:text-gray-900">
                    {actor.biography && actor.biography.length > 300 ? (
                        <>
                            {showFullBiography ? actor.biography : actor.biography.substring(0, 300) + "..."}
                            <button
                                className="text-blue-500 dark:text-blue-700 ml-1"
                                onClick={() => setShowFullBiography(!showFullBiography)}
                            >
                                {showFullBiography ? "Read Less" : "Read More"}
                            </button>
                        </>
                    ) : (
                        actor.biography || "Biography not available."
                    )}
                </p>
            </div>

            {/* Known For */}

            <MovieList movies={actor.movie_credits.cast} />

            {/* Acting */}
            <div>
                <MovieActingList
                    movies={actor.movie_credits.cast}
                    handleMovieDetailClick={handleMovieDetailClick}
                />
                {selectedMovie && (
                    <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
};

export default ActorWorks;
