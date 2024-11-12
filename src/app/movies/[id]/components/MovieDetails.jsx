

import MovieRatings from "./MovieRatings";
import OverviewToggle from "./OverviewToggle";
import CrewList from "./CrewList";

const MovieDetails = ({ movie }) => {
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="md:w-2/3 space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        {movie.title}{" "}
        <span className="text-gray-800 dark:text-gray-300">
          ({new Date(movie.release_date).getFullYear()})
        </span>
      </h1>
      {movie.tagline && (
        <p className="italic text-gray-300 text-sm md:text-base">
          {movie.tagline}
        </p>
      )}
      <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
        Release Date: {movie.release_date}
      </p>
      <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
        Genres: {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
        Runtime: {formatRuntime(movie.runtime)}
      </p>
      <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
        Popularity: {movie.popularity}
      </p>
      {/* Ratings */}
      <MovieRatings
        vote_average={movie.vote_average}
        vote_count={movie.vote_count}
      />

      

      {/* Overview */}
      <OverviewToggle overview={movie.overview} />

      {/* Crew */}
      <CrewList crew={movie.credits.crew} />
    </div>
  )
};

export default MovieDetails;
