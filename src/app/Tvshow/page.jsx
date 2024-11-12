"use client";
import CardComponent from "@/components/Card";
import React, { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import FilterSidebar from "./components/FilterSidebar";
import { m } from "framer-motion";

const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN;

const fetchTvshow = async (filter, page, filters) => {
  try {
    let url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=${filter}&page=${page}`;

   
    if (filters.genre) {
      url += `&with_genres=${filters.genre}`;
    }
    if (filters.releaseYear) {
      url += `&primary_release_year=${filters.releaseYear}`;
    }
    if (filters.voteAverage) {
     
      const convertedVoteAverage = filters.voteAverage / 10;
      url += `&vote_average.gte=${convertedVoteAverage}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Tvshow");
    }
    const data = await response.json();
    return { results: data.results, total_pages: data.total_pages };
  } catch (error) {
    console.error("Error fetching Tvshow:", error);
    return { results: [], total_pages: 0 };
  }
};

const Page = () => {
  const [Tvshow, setTvshow] = useState([]);
  const [filter, setFilter] = useState("popularity.desc"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [showNoTvshowMessage, setShowNoTvshowMessage] = useState(false);

  useEffect(() => {
    const getTvshow = async () => {
      setLoading(true);
      const { results, total_pages } = await fetchTvshow(
        filter,
        currentPage,
        appliedFilters
      );
      setTvshow(results);
      setTotalPages(total_pages);
      setLoading(false);
      setTimeout(() => setShowNoTvshowMessage(true), 5000); 
    };
    getTvshow();
  }, [filter, currentPage, appliedFilters]);

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col lg:flex-row p-6">
      <div className="lg:w-64 mb-6 lg:mb-0 lg:mr-6">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1">
        <div className="flex gap-4 mb-4 justify-center flex-wrap">
          {[{ label: "Popular", value: "popularity.desc" },
            { label: "Now Playing", value: "now_playing" },
            { label: "Upcoming", value: "upcoming" },
            { label: "Top Rated", value: "vote_average.desc" },
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setFilter(category.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filter === category.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tvshow Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-2  mb-6">
          {loading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <CardComponent key={idx} loading={true} />
            ))
          ) : Tvshow && Tvshow.length > 0 ? (
            Tvshow.map((tv) => (
              <CardComponent
                key={tv.id}
                title={tv.title || tv.name}
                image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                date={tv.release_date}
                progress={tv.vote_average * 10}
                loading={false}
                id={tv.id}
                customClass="w-full"
                CardType="Tvshow"
              />
            ))
          ) : showNoTvshowMessage ? (
            <p>No Tvshow found.</p>
          ) : null}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
