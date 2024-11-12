// actor/[id]/page.jsx

import ActorInformation from "./components/ActorInformation"
import ActorWorks from "./components/ActorWorks"

// Fetch actor details from TMDB
const fetchActorDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=movie_credits,external_ids`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`,
    },
  })
  return response.ok ? response.json() : null
}

// This component is now a Server Component
const ActorDetails = async ({ params }) => {
  const { id } = params
  const actor = await fetchActorDetails(id)

  if (!actor) {
    return <div>Actor not found.</div>
  }

  const { profile_path } = actor

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-100 dark:text-gray-900 min-h-screen">
      <section className="relative bg-gray-800 dark:bg-gray-200 rounded-lg shadow-lg overflow-hidden mb-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${profile_path}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 dark:bg-white/20 opacity-90"></div>
        </div>
        <div className="relative flex flex-col md:flex-row gap-6 p-6">


          {/* ActorInformation Side */}
          <ActorInformation actor={actor} />


          {/* ActorWorks Side */}
          <ActorWorks actor={actor} />


        </div>
      </section>
    </div>
  )
}

export default ActorDetails
