"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // For fetching query params in Next.js 14
import CircularProgress from "@/components/CircularProgress";
import CardComponent from "@/components/Card";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
          options
        );

        const data = await response.json();
        setSearchResults(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  }

  if (searchResults.length === 0) {
    return <div className="text-center mt-10">No results found for "{query}".</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for =  {query}</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {searchResults.map((movie) => (
          <CardComponent
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            date={movie.release_date}
            progress={movie.vote_average * 10} // Assuming vote_average is from 0-10
            CardType={"actors"}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
