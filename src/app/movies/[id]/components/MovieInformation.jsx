import SocialMediaLinks from "@/components/SocialMediaLinks"


// Format numbers with commas
    const formatNumber = (number) => number.toLocaleString("en-US")



const MovieInformation = ({ homepage, movie }) => {
    const {
        original_language,
        spoken_languages,
        production_countries,
        budget,
        revenue,
        keywords,
        belongs_to_collection,
        alternative_titles,
    } = movie
    return (
        <div className="lg:w-1/4 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md lg:sticky lg:top-4 lg:h-auto">
            <h3 className="text-xl md:text-2xl font-semibold">Movie Info</h3>
            <div className="space-y-2">
                {homepage && (
                    <a
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm md:text-base"
                    >
                        Visit Official Website
                    </a>
                )}
                
                <SocialMediaLinks external_ids={movie.external_ids} />
                <div className="text-sm md:text-base">
                    <strong>Status:</strong>
                    <p>{movie.status}</p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Language:</strong>
                    <p>{original_language}</p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Spoken Languages:</strong>
                    <p>{spoken_languages.map((lang) => lang.name).join(", ")}</p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Production Countries:</strong>
                    <p>
                        {production_countries.map((country) => country.name).join(", ")}
                    </p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Budget:</strong>
                    <p>${formatNumber(budget)}.00</p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Revenue:</strong>
                    <p>${formatNumber(revenue)}.00</p>
                </div>
                <div className="text-sm md:text-base">
                    <strong>Keywords:</strong>
                    <p>
                        {keywords && keywords.length > 0
                            ? keywords.map((kw) => kw.name).join(", ")
                            : "No keywords available"}
                    </p>
                </div>
                {belongs_to_collection && (
                    <div className="text-sm md:text-base">
                        <strong>Part of Collection:</strong>
                        <p>{belongs_to_collection.name}</p>
                    </div>
                )}
                {alternative_titles && alternative_titles.length > 0 && (
                    <div className="text-sm md:text-base">
                        <strong>Alternative Titles:</strong>
                        <p>{alternative_titles.map((title) => title.title).join(", ")}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieInformation
