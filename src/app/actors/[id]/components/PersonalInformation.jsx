// actor/[id]/components/PersonalInfo.jsx

const  PersonalInfo = ({ actor }) => {
  const {birthday,known_for_department, gender,popularity,place_of_birth,also_known_as,} = actor

  return (
    <div className="mt-6 text-gray-200 dark:text-gray-800">
      <h3 className="text-xl font-bold">Personal Info</h3>
      <ul className="mt-2 space-y-2 pl-3">
        <li>
          <strong>Birthday:</strong> <br/> &emsp;&emsp; {birthday || "Not available"}
        </li>
        <li>
          <strong>Known For:</strong> <br/> &emsp;&emsp; {known_for_department || "Not available"}
        </li>
        <li>
          <strong>Gender:</strong> <br/> &emsp;&emsp;{gender === 1 ? "Female" : "Male"}
        </li>
        <li>
          <strong>Popularity:</strong> <br/> &emsp;&emsp;{popularity}
        </li>
        <li>
          <strong>Place of Birth:</strong> <br/> &emsp;&emsp;{place_of_birth || "Not available"}
        </li>
        <li>
          <strong>Also Known As:</strong>
          <ul className="list-disc ml-5 mt-1 pl-4">
            {also_known_as.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default PersonalInfo
