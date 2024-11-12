// src/app/movies/[id]/page.jsx
import { Spinner } from "@nextui-org/react"
import MoviePoster from "./components/MoviePoster"
import MovieDetails from "./components/MovieDetails"
import CastList from "./components/CastList"
import TrailerEmbed from "./components/TrailerEmbed"
import RecommendedMovies from "./components/RecommendedMovies"
import ProductionCompanies from "./components/ProductionCompanies"
import MovieInformation from "./components/MovieInformation"

// Fetch details of a movie by ID from TMDB API (SSR compatible)
const fetchMovieDetails = async (id) => {
  const movie_url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,credits,recommendations,external_ids`
  const response = await fetch(movie_url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
    },
  })
  return response.ok ? response.json() : null
}

const SingleMoviePage = async ({ params }) => {
  const { id } = params
  let movie
  try {
    // Attempt to fetch movie details
    movie = await fetchMovieDetails(id)
  } catch (error) {
    // Handle the error case when fetching movie details
    return (
      <p className="text-red-500">
        {error.message.includes("Network")
          ? "Error fetching movie details. Please check your internet connection."
          : "Error in entering the movie ID. Please check the entered ID."}
      </p>
    )
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Part one */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-30"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>
        <div className="relative p-6 flex flex-col md:flex-row gap-6">
          {/* Movie Poster */}
          <MoviePoster poster_path={movie.poster_path} title={movie.title} />

          {/* Movie Details */}
          <MovieDetails movie={movie} />
        </div>
      </div>

      {/* Part two */}
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Movie Information */}
        <MovieInformation homepage={movie.homepage} movie={movie} />

        <div className="lg:w-3/4 space-y-8">
          {/* Cast */}
          <CastList cast={movie.credits.cast} />

          {/* Trailer */}
          <TrailerEmbed videos={movie.videos} key={movie.id} />
        </div>
      </div>

      {/* Part three */}
      {/* Recommended Movies */}
      <RecommendedMovies recommendations={movie.recommendations.results} />

      {/* Part four */}
      {/* Production Companies */}
      <ProductionCompanies companies={movie.production_companies} />
    </div>
  )
}

export default SingleMoviePage
