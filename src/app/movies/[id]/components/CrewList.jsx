const CrewList = ({ crew }) => (
  <div className="mt-6">
    <h2 className="text-xl md:text-2xl font-semibold">Crew</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      {crew.slice(0, 20).map((crewMember, index) => (
  <div key={`${crewMember.id}-${index}`} className="text-center">
    <p className="text-black dark:text-white font-semibold text-sm md:text-base">
      {crewMember.name}
    </p>
    <p className="text-gray-900 dark:text-gray-400 text-xs md:text-sm">
      {crewMember.job}
    </p>
  </div>
))}
    </div>
  </div>
);

export default CrewList;
