import Link from "next/link";

const Footer = () => {
  const teamMembers = [
    {
      name: "Yasser Alaraqi",
      github: "https://github.com/YasserEsam",
      linkedin: "https://www.linkedin.com/in/yasser-al-ariqi/",
    },
    {
      name: "Waleed Alabbasi",
      github: "https://github.com/waleed7333",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Kareem Sallam",
      github: "https://github.com/k",
      linkedin: "https://linkedin.com/in/k",
    },
  ];

  const pages = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Actors", href: "/actors" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 pt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Team Members Section */}
        <div className="flex flex-wrap gap-8 mb-6 md:mb-0 justify-center md:justify-start">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {member.name}
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <Link
                  href={member.github}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  target="_blank"
                >
                  GitHub
                </Link>
                <span className="text-gray-500 dark:text-gray-400">|</span>
                <Link
                  href={member.linkedin}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-end">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-lg"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 py-4 mt-6">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          &copy; 2024 Your Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
