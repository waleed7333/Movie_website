"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
// import Link from "next/link"
import CardComponent from "@/components/Card"
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faHeart, faBookmark, faStar } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "@nextui-org/react";
import { m } from "framer-motion"
const fetchTvshowDetails = async (id) => {
    try {
        const headers = {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
        }

        const [
            movieResponse,
            creditsResponse,
            relatedMoviesResponse,
            trailerResponse,
        ] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/tv/${id}?`, {
                headers,
            }),
            axios.get(
                `https://api.themoviedb.org/3/tv/${id}/credits?`,
                { headers },
            ),
            axios.get(
                `https://api.themoviedb.org/3/tv/${id}/recommendations?page=1`,
                { headers },
            ),
            axios.get(
                `https://api.themoviedb.org/3/tv/${id}/videos?`,
                { headers },
            ),
        ])

        const movie = movieResponse.data
        const credits = creditsResponse.data
        const relatedMovies = relatedMoviesResponse.data.results
        const trailer = trailerResponse.data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube",
        )

        return {
            ...movie,
            credits,
            related_movies: relatedMovies,
            trailer: trailer ? trailer.key : null,
        }
    } catch (error) {
        console.error("Error fetching Tvshow details:", error)
        throw new Error("Failed to load Tvshow details")
    }
}


const SingleMoviePage = ({ params }) => {
    const { id } = params
    const [Tvshow, setTvshow] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showOverview, setShowOverview] = useState(false)

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true)
            setError("")
            try {
                const data = await fetchTvshowDetails(id)
                setTvshow(data)
            } catch (error) {
                setError("Failed to load Tvshow details.")
                console.error("Error fetching Tvshow details:", error)
            } finally {
                setLoading(false)
            }
        }
        loadMovie()
    }, [id])

    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        );
      }
    if (error) return <p className="text-red-500">{error}</p>

    if (!Tvshow) return null

    const {
        title,
        poster_path,
        release_date,
        runtime,
        genres,
        original_language,
        vote_average,
        vote_count,
        credits,
        production_companies,
        trailer,
        related_movies,
        popularity,
        tagline,
        homepage,
        production_countries,
        spoken_languages,
        budget,
        revenue,
        keywords,
        belongs_to_collection,
        backdrop_path,
        alternative_titles,
        social_links,
    } = Tvshow;

    // Format runtime to "2h 8m"
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    
    const formatNumber = (number) => ("en-US")

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
            <div className="relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-30"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                    }}
                ></div>
                <div className="relative p-6 flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 w-full flex flex-col items-center">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            width={500}
                            height={750}
                            className="rounded-lg shadow-lg w-full max-w-xs md:max-w-none"
                            loading="lazy"
                            
                        />
                    </div>

                    <div className="md:w-2/3 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {title}
                            <span className="text-gray-800 dark:text-gray-300">
                                ({new Date(release_date).getFullYear()})
                            </span>
                        </h1>
                        {tagline && (
                            <p className="italic text-gray-300 text-sm md:text-base">
                                {tagline}
                            </p>
                        )}
                        <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
                            Release Date: {release_date}
                        </p>
                        <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
                            Genres: {genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
                            Runtime: {formatRuntime(runtime)}
                        </p>
                        <p className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
                            Popularity: {popularity}
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 md:w-16 md:h-16">
                                <svg className="absolute inset-0" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-700"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className={`${vote_average >= 7
                                                ? "text-green-500"
                                                : vote_average >= 4
                                                    ? "text-yellow-500"
                                                    : "text-red-500"
                                            }`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeDasharray={`${(vote_average / 10) * 100}, 100`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-xs md:text-sm">
                                    {Math.round(vote_average * 10)}%
                                </div>
                            </div>
                            <span className="text-gray-900 dark:text-gray-300 text-sm md:text-base">
                                ({vote_count} votes)
                            </span>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <div className="relative group">
                                <button className="bg-gray-700 p-2 rounded-lg">
                                    <FontAwesomeIcon icon={faList} className="text-white" />
                                </button>
                                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Add to List
                                </span>
                            </div>

                            <div className="relative group">
                                <button className="bg-gray-700 p-2 rounded-lg">
                                    <FontAwesomeIcon icon={faHeart} className="text-white" />
                                </button>
                                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Favorite
                                </span>
                            </div>

                            <div className="relative group">
                                <button className="bg-gray-700 p-2 rounded-lg">
                                    <FontAwesomeIcon icon={faBookmark} className="text-white" />
                                </button>
                                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Watchlist
                                </span>
                            </div>

                            <div className="relative group">
                                <button className="bg-gray-700 p-2 rounded-lg">
                                    <FontAwesomeIcon icon={faStar} className="text-white" />
                                </button>
                                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Your Vibe
                                </span>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-900 dark:text-gray-300">
                            {showOverview
                                ? Tvshow.overview
                                : `${Tvshow.overview.substring(0, 300)}...`}
                            <button
                                className="text-blue-500"
                                onClick={() => setShowOverview(!showOverview)}
                            >
                                {showOverview ? "Read less" : "Read more"}
                            </button>
                        </p>

                        <div className="mt-6">
                            <h2 className="text-xl md:text-2xl font-semibold">Crew</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {credits.crew.slice(0, 20).map((crewMember) => (
                                    <div key={crewMember.id} className="text-center">
                                        <p className="text-black dark:text-white font-semibold text-sm md:text-base">
                                            {crewMember.name}
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-400 text-xs md:text-sm">
                                            {crewMember.job}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md lg:sticky lg:top-4 lg:h-auto">
                    <h3 className="text-xl md:text-2xl font-semibold">Movie Info</h3>
                    <div className="space-y-2">
                        {social_links && (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {social_links.facebook && (
                                    <a
                                        href={social_links.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 text-sm md:text-base"
                                    >
                                        <FaFacebookF />
                                    </a>
                                )}
                                {social_links.twitter && (
                                    <a
                                        href={social_links.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 text-sm md:text-base"
                                    >
                                        <FaTwitter />
                                    </a>
                                )}
                                {social_links.instagram && (
                                    <a
                                        href={social_links.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-500 text-sm md:text-base"
                                    >
                                        <FaInstagram />
                                    </a>
                                )}
                                {social_links.youtube && (
                                    <a
                                        href={social_links.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-600 text-sm md:text-base"
                                    >
                                        <FaYoutube />
                                    </a>
                                )}
                            </div>
                        )}
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
                        <p className="text-sm md:text-base">
                            <strong>Status:</strong>
                            <p>{Tvshow.status}</p>
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Language:</strong>
                            <p>{original_language}</p>
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Spoken Languages:</strong>
                            <p>{spoken_languages.map((lang) => lang.name).join(", ")}</p>
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Production Countries:</strong>
                            <p>
                                {production_countries
                                    .map((country) => country.name)
                                    .join(", ")}
                            </p>{" "}
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Budget:</strong>
                            {<p>${formatNumber(budget)}.00</p> }
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Revenue:</strong>
                            { <p>${formatNumber(revenue)}.00</p> }
                        </p>
                        <p className="text-sm md:text-base">
                            <strong>Keywords:</strong>
                            <p>
                                {keywords && keywords.length > 0
                                    ? keywords.map((kw) => kw.name).join(", ")
                                    : "No keywords available"}
                            </p>{" "}
                        </p>
                        {belongs_to_collection && (
                            <p className="text-sm md:text-base">
                                <strong>Part of Collection:</strong>
                                <p>{belongs_to_collection.name}</p>
                            </p>
                        )}
                        {alternative_titles && alternative_titles.length > 0 && (
                            <p className="text-sm md:text-base">
                                <strong>Alternative Titles:</strong>
                                <p>
                                    {alternative_titles.map((title) => title.title).join(", ")}
                                </p>{" "}
                            </p>
                        )}
                    </div>
                </div>

                <div className="lg:w-3/4 space-y-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">
                            Main Actors
                        </h3>
                        <div className="flex overflow-x-scroll space-x-6 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                            {credits.cast.slice(0, 20).map((actor) => (
                                <CardComponent
                                    key={actor.id}
                                    image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    title={actor.name}
                                    id={actor.id}
                                    customClass="min-w-[150px] md:min-w-[190px]"
                                    CardType="actors"
                                >
                                    <p className="text-gray-800 dark:text-gray-400 text-center text-xs md:text-sm">
                                        {actor.character}
                                    </p>
                                </CardComponent>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold">Trailer</h3>
                        {trailer && (
                            <iframe
                                className="w-full h-[225px] md:h-[450px] mt-4"
                                src={`https://www.youtube.com/embed/${trailer}`}
                                title={`${title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold">
                    Recommended Movies
                </h3>
                <div className="flex overflow-x-scroll space-x-4 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                    {related_movies.slice(0, 20).map((Tvshow) => (
                        <CardComponent
                            key={Tvshow.id}
                            image={`https://image.tmdb.org/t/p/w500${Tvshow.poster_path}`}
                            title={Tvshow.title}
                            id={Tvshow.id}
                            customClass="min-w-[160px] md:min-w-[200px]"
                            CardType="Tvshow"
                        >
                            <p className="text-gray-700 dark:text-gray-400 text-center text-xs md:text-sm">
                                {Tvshow.release_date}
                            </p>
                        </CardComponent>
                    ))}
                </div>
            </div>

            {/* الشركات المنتجة */}
            <div className="mt-6 p-6">
                <h3 className="text-xl md:text-2xl font-semibold">
                    {" "}
                    Company Production
                </h3>
                <div className="mt-4 flex flex-wrap justify-evenly items-center gap-4">
                    {production_companies.map((company) =>
                        company.logo_path ? (
                            <div
                                key={company.id}
                                className="flex flex-col  items-center w-32 md:w-40"
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                    alt={company.name}
                                    width={190}
                                    height={200}
                                    className="object-contain transform hover:scale-105 transition-transform"
                                />
                                <p className="mt-2 text-black dark:text-white font-bold text-center text-xs md:text-sm">
                                    {company.name}
                                </p>
                            </div>
                        ) : null,
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleMoviePage
