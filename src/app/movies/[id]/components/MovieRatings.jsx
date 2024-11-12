import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieRatings = ({ vote_average, vote_count }) => (
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
          className={`${
            vote_average >= 7 ? "text-green-500" : vote_average >= 4 ? "text-yellow-500" : "text-red-500"
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
);

export default MovieRatings;
