"use client";
import CardComponent from "@/components/Card";
import React, { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";

const API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN;


const fetchActors = async (page) => {
  try {
    const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch actors");
    }
    const data = await response.json();
    return { results: data.results, total_pages: data.total_pages };
  } catch (error) {
    console.error("Error fetching actors:", error);
    return { results: [], total_pages: 0 };
  }
};

const ActorsPage = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showNoActorsMessage, setShowNoActorsMessage] = useState(false);

  useEffect(() => {
    const getActors = async () => {
      setLoading(true);
      const { results, total_pages } = await fetchActors(currentPage);
      setActors(results);
      setTotalPages(total_pages);
      setLoading(false);
      setTimeout(() => setShowNoActorsMessage(true), 5000);
    };
    getActors();
  }, [currentPage]);

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Popular Actors</h1>

      {/* Actors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-2  mb-6">
        {loading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <CardComponent key={idx} loading={true} />
          ))
        ) : actors && actors.length > 0 ? (
          actors.map((actor) => (
            <CardComponent
              key={actor.id}
              title={actor.name}
              image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              customClass="w-full"
              loading={false}
              id={actor.id} 
              CardType={"actors"}
            />
          ))
        ) : showNoActorsMessage ? (
          <p>No actors found.</p>
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
  );
};

export default ActorsPage;
