import React from "react";
import CardComponent from "./Card";

const Slider = ({ movies = [], loading }) => {
  return (
    <div className="mx-auto container overflow-x-auto whitespace-nowrap p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-blue-900 scrollbar-track-blue-100">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <CardComponent key={index} loading={true} />
        )) 
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <CardComponent
            key={movie.id}
            title={movie.title || movie.name}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            date={movie.release_date}
            progress={movie.vote_average * 10} 
            loading={false}
            id={movie.id} 
            CardType="movies"
          />
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>      
  );
};

export default Slider;
