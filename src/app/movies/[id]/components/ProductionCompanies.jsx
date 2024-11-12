
import Image from "next/image"
const ProductionCompanies = ({ companies }) => (
    <div className="mt-6 p-6">
        <h2 className="text-xl md:text-2xl font-semibold">Production Companies</h2>
        <div className="mt-4 flex flex-wrap justify-evenly items-center gap-4">
            {companies.map((company) => (
                <div key={company.id} className="text-center">
                    {company.logo_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                            alt={company.name}
                            width={190}
                            height={200}
                            className="mx-auto w-32 h-auto"
                        />
                        
                    ) : (
                        <p className="text-gray-900 dark:text-gray-300">{company.name}</p>
                    )}
                </div>
            ))}
        </div>
    </div>
)

export default ProductionCompanies
