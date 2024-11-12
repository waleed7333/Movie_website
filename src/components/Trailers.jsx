import React, { useEffect, useState } from 'react';
import TrailerSlider from "@/components/TrailerSlider"; // Use TrailerSlider instead of Slider

const categories = ["Popular", "Streaming", "For Rent", "In Theaters"];
const categoryToEndpoint = {
  Popular: "popular",
  Streaming: "now_playing",
  "In Theaters": "now_playing",
  "For Rent": "upcoming"
};

const Trailers = () => {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (category) => {
    try {
      setLoading(true);
      const endpoint = categoryToEndpoint[category];
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(activeCategory);
  }, [activeCategory]);

  return (
    <div className='relative bg-cover bg-center py-6 px-4 my-14' style={{ backgroundImage: "url('/marvel.png')", backgroundAttachment: 'fixed' }}>
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>      

      <div className='relative'>
        <div className='px-6'>
          <h1 className='text-3xl font-bold mb-4 text-white'>Latest Trailers</h1>
          <p className='text-lg mb-4 text-white'>
            Check out the latest trailers for upcoming movies. Stay updated with the most exciting releases and sneak peeks.
          </p>

          <div className='flex flex-col md:flex-row gap-4 mb-6 relative z-30'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full md:w-auto px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                } hover:bg-blue-500`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className='relative'>
          <TrailerSlider movies={movies} loading={loading} /> {/* Use TrailerSlider */}
        </div>
      </div>
    </div>
  );
};

export default Trailers;
