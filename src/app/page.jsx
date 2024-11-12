// app/page.jsx

"use client";
import React, { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import Trailers from "@/components/Trailers";
import ContentTitle from "@/components/MoviesTitle";
import { useRouter } from "next/navigation"; // For navigating in Next.js 14

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const [freeContent, setFreeContent] = useState([]);
  const [loadingFreeContent, setLoadingFreeContent] = useState(true);
  const [type, setType] = useState("movie");

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch trending movies based on time window
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`,
          options
        );

        const data = await response.json();
        setMovies(data.results);
        setLoadingTrending(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setLoadingTrending(false);
      }
    };

    fetchMovies();
  }, [timeWindow]);

  // Fetch free-to-watch content based on type (movie or tv)
  useEffect(() => {
    const fetchFreeToWatch = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${type}?language=en-US&watch_region=US&with_watch_monetization_types=free`,
          options
        );

        const data = await response.json();
        setFreeContent(data.results);
        setLoadingFreeContent(false);
      } catch (error) {
        console.error("Error fetching free content:", error);
        setLoadingFreeContent(false);
      }
    };

    fetchFreeToWatch();
  }, [type]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="min-h-screen container mx-auto">
      {/* Header section */}
      <header
        className="relative w-full h-[550px] md:h-[550px] lg:h-[550px] bg-cover bg-center"
        style={{ backgroundImage: "url('/coverImage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative flex flex-col items-center justify-center h-full text-white px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-[800px] w-full leading-tight lg:leading-snug">
            Discover the Best Movies and Hidden Treasures
          </h1>

          <p className="text-md md:text-xl lg:text-2xl max-w-[600px] w-full leading-relaxed lg:leading-relaxed">
            Dive into an extraordinary collection of movies from the latest
            blockbusters to rare indie films.
          </p>

          {/* Search form */}
          <div className="w-full max-w-[600px]">
            <form className="flex items-center justify-center" onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, genres, or actors..."
                className="w-full py-3 px-5 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none shadow-lg"
              />
              <button
                type="submit"
                className="ml-3 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* First component: Trending Movies */}
      <div className="px-4 my-8">
        <ContentTitle
          title="Trending Movies"
          setTimeWindow={setTimeWindow}
          options={[
            { value: "day", label: "Today" },
            { value: "week", label: "This Week" },
          ]}
        />
        <Slider movies={movies} loading={loadingTrending} />
      </div>

      {/* Second component: Trailers */}
      <Trailers />

      {/* Third component: Free to Watch Section */}
      <div className="px-4 my-8">
        <ContentTitle
          title="Free to Watch"
          setTimeWindow={setType}
          options={[
            { value: "movie", label: "Movies" },
            { value: "tv", label: "TV Shows" },
          ]}
        />
        <Slider movies={freeContent} loading={loadingFreeContent} />
      </div>
    </main>
  );
};

export default Page;
