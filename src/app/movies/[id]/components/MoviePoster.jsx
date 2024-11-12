import Image from "next/image";

const MoviePoster = ({ poster_path, title }) => (
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
);

export default MoviePoster;
