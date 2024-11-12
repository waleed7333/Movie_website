// actor/[id]/components/MovieDetailsModal.jsx

import Image from "next/image"

const MovieDetailsModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 max-w-lg w-full relative transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          &times;
        </button>
        <div className="flex">
          <div className="w-1/3">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={150}
              height={225}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Rating: {movie.vote_average} / 10
            </p>
            <p className="mt-4 text-gray-800 dark:text-gray-200">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsModal
