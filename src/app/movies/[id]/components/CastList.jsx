import CardComponent from "@/components/Card"
const CastList = ({ cast }) => {
    return (

        <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Main Actors</h3>
            <div className="flex overflow-x-scroll space-x-6 py-4 scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                {cast.slice(0, 20).map((actor) => (
                    <CardComponent
                        key={actor.id}
                        image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        title={actor.name}
                        id={actor.id}
                        customClass="min-w-[150px] md:min-w-[190px]"
                        isActor={true}
                    >
                        <p className="text-gray-800 dark:text-gray-400 text-center text-xs md:text-sm">
                            {actor.character}
                        </p>
                    </CardComponent>
                ))}
            </div>
        </div>
    )
}
export default CastList
