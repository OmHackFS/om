import { useState } from "react";
import Link from "next/link";
const HEADERS = [
  { name: "Proposals", active: true ,path: "/proposals",id: "0" },
  { name: "Dao Data", active: false,path:"/dao_data", id: "2" },
  { name: "Groups Settings", active: false,path:"/my_page", id: "3" },
];

export const SubHeader = () => {
  const [activeHeader, setActiveHeader] = useState<string>("Proposals");

  const handleSelectHeader = (newHeader: string) => {
    setActiveHeader(newHeader);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto sm:px-4 lg:px-8">
        <div className="flex justify-between h-8">
          <div className="flex lg:px-0">
            <div className="hidden lg:flex lg:space-x-8">
              {/* <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
              {HEADERS.map((header) => (
              <Link href={header.path}>
                    <span
                  onClick={() => handleSelectHeader(header.name)}
                  key={header.id}
                  className={`cursor-pointer
                    ${
                      activeHeader === header.name
                        ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }`}
                >
                  {header.name}
                </span>
              </Link>
            
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="lg:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" --> */}
          {HEADERS.map((header) => (
            <span
              onClick={() => handleSelectHeader(header.name)}
              key={header.id}
              className={`cursor-pointer
                    ${
                      activeHeader === header.name
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    }`}
            >
              {header.name}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};
