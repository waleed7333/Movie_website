// actor/[id]/components/MovieActingList.jsx

import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

const MovieActingList = ({ movies, handleMovieDetailClick }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-900">
                Acting
            </h2>
            <div className="space-y-4">
                {movies
                    .slice()
                    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                    .slice(0, 15)
                    .map((movie) => (
                        <div
                            key={movie.id}
                            className="relative bg-gray-300 dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-600 dark:border-gray-400 transition-transform transform hover:scale-105"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 dark:text-gray-300">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                                <button
                                    onClick={() => handleMovieDetailClick(movie)}
                                    className="text-blue-500 dark:text-blue-700 hover:text-blue-700 dark:hover:text-blue-900 transition-colors"
                                >
                                    <FaInfoCircle size={20} />
                                </button>
                                <div className="flex-1">
                                    <Link href={`/movies/${movie.id}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-400 transition-colors cursor-pointer">
                                            {movie.title}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        as {movie.character}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};

export default MovieActingList;
