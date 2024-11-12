import CardComponent from "@/components/Card"

const MovieList = ({ movies }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-100 dark:text-gray-900">
        Known For
      </h2>
      <div className="flex overflow-x-auto space-x-4 py-2 text-black dark:text-white">
        {movies.slice(0, 10).map((movie) => (
          <CardComponent
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            date={new Date(movie.release_date).getFullYear()}
            id={movie.id}
            isActor={false}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList
