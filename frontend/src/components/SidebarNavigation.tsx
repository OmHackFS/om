import { useState } from "react";
import logo from "../logos/Om-logos_white.png";

const TABS = [
  {
    id: "0",
    name: "DAO's",
    active: true,
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "1",
    name: "My Page",
    active: false,
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "2",
    name: "Data",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
];

export const SidebarNavigation = () => {
  const [activeTab, setActiveTab] = useState("DAO's");

  const handleSelectTab = (newTab: string) => {
    setActiveTab(newTab);
  }

  return (
    <div>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div className="relative z-40 md:hidden" role="dialog" aria-modal="true">
        {/* <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.
      
            Entering: "transition-opacity ease-linear duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
              From: "opacity-100"
              To: "opacity-0"
          --> */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>

        <div className="fixed inset-0 flex z-40">
          {/* <!--
              Off-canvas menu, show/hide based on off-canvas menu state.
      
              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            --> */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
            {/* <!--
                Close button, show/hide based on off-canvas menu state.
      
                Entering: "ease-in-out duration-300"
                  From: "opacity-0"
                  To: "opacity-100"
                Leaving: "ease-in-out duration-300"
                  From: "opacity-100"
                  To: "opacity-0"
              --> */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                {/* <!-- Heroicon name: outline/x --> */}
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-24 w-auto" src={logo} alt="Om" />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
                {TABS.map((tab) => (
                  <a
                    key={tab.name}
                    className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    {tab.logo}
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-24 w-auto" src={logo} alt="Om" />
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
              {TABS.map((tab) => (
                <span
                  key={tab.name}
                  onClick={() => handleSelectTab(tab.name)}
                  className={`cursor-pointer ${
                    activeTab === tab.name ? "bg-indigo-800 text-white" : "text-indigo-100"
                  } hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  {tab.logo}
                  {tab.name}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
