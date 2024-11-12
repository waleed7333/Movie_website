import CardComponent from "@/components/Card"

const RecommendedMovies = ({ recommendations }) => {

    if (!recommendations || recommendations.length === 0) {
        return <p>No recommended movies found.</p>;
    }
    return(
    <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold">Recommended Movies</h2>
        <div className="flex overflow-x-scroll space-x-4 py-2">
            {recommendations.map((movie) => (
                <CardComponent
                            key={movie.id}
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            id={movie.id}
                            customClass="min-w-[160px] md:min-w-[200px]"
                            isActor={false}
                        >
                            <p className="text-gray-700 dark:text-gray-400 text-center text-xs md:text-sm">
                                {movie.release_date}
                            </p>
                        </CardComponent>
            ))}
        </div>
    </div>
)
}
export default RecommendedMovies;
