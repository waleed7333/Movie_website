import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const TrailerModal = ({ movieId, isOpen, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (isOpen && movieId) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
              },
            }
          );
          const data = await response.json();
          const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          } else {
            setTrailerUrl("");
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
          setTrailerUrl("");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTrailer();
  }, [movieId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <button
          className="absolute top-0 right-[-2px] text-black text-xl hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : trailerUrl ? (
          <div className="p-4">
            <iframe
              width="100%"
              height="400"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="p-4">
            <p>No trailer available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
