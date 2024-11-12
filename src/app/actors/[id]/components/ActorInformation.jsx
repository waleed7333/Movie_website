// actor/[id]/components/ActorInformation.jsx

import Image from "next/image"
import SocialMediaLinks from "@/components/SocialMediaLinks"
import PersonalInfo from "./PersonalInformation"

const ActorInformation = ({ actor }) => {
  return (
    <div className=" md:w-1/3 flex flex-col items-center">
      <div className="flex justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
          alt={actor.name}
          width={500}
          height={800}
          className="w-full max-w-sm h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <SocialMediaLinks
        external_ids={actor.external_ids}
      />
      <PersonalInfo actor={actor} />
    </div>
  )
}

export default ActorInformation
