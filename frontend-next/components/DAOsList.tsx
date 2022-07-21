import { daos } from "./mocks/daos";
import Link from "next/link";

export const DAOsList = () => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {daos.map((dao) => (
        <Link href={`/proposals`}>
          <div className="max-w-sm overflow-hidden shadow-lg rounded-[3.5rem] cursor-pointer">
            <div className="flex justify-center p-4 mt-4">
              <img className="max-h-56 rounded-[3.5rem]" src={dao.img} alt="" />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{dao.name}</div>
              <p className="text-gray-700 text-base">{dao.description}</p>
            </div>
            <div className="px-6 flex flex-row">
              <span className="flex flex-row gap-1 items-center flex-1 justify-center">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.30588 7.18118C9.7453 6.80082 10.0977 6.33038 10.3393 5.80178C10.5809 5.27319 10.7059 4.69882 10.7059 4.11765C10.7059 3.02558 10.2721 1.97824 9.49985 1.20603C8.72764 0.433822 7.6803 1.47338e-07 6.58824 1.47338e-07C5.49617 1.47338e-07 4.44883 0.433822 3.67662 1.20603C2.90441 1.97824 2.47059 3.02558 2.47059 4.11765C2.47058 4.69882 2.5956 5.27319 2.83716 5.80178C3.07872 6.33038 3.43117 6.80082 3.87059 7.18118C2.71776 7.7032 1.73968 8.5462 1.05328 9.60939C0.366878 10.6726 0.00121212 11.911 0 13.1765C0 13.3949 0.0867644 13.6044 0.241206 13.7588C0.395648 13.9132 0.605116 14 0.823529 14C1.04194 14 1.25141 13.9132 1.40585 13.7588C1.56029 13.6044 1.64706 13.3949 1.64706 13.1765C1.64706 11.866 2.16765 10.6092 3.0943 9.68253C4.02095 8.75588 5.27775 8.23529 6.58824 8.23529C7.89872 8.23529 9.15552 8.75588 10.0822 9.68253C11.0088 10.6092 11.5294 11.866 11.5294 13.1765C11.5294 13.3949 11.6162 13.6044 11.7706 13.7588C11.9251 13.9132 12.1345 14 12.3529 14C12.5714 14 12.7808 13.9132 12.9353 13.7588C13.0897 13.6044 13.1765 13.3949 13.1765 13.1765C13.1753 11.911 12.8096 10.6726 12.1232 9.60939C11.4368 8.5462 10.4587 7.7032 9.30588 7.18118ZM6.58824 6.58824C6.0996 6.58824 5.62194 6.44334 5.21565 6.17187C4.80936 5.90039 4.4927 5.51454 4.30571 5.0631C4.11872 4.61166 4.06979 4.11491 4.16512 3.63566C4.26045 3.15641 4.49575 2.7162 4.84127 2.37068C5.18678 2.02516 5.627 1.78986 6.10625 1.69453C6.58549 1.5992 7.08225 1.64813 7.53369 1.83512C7.98513 2.02211 8.37098 2.33878 8.64245 2.74506C8.91393 3.15135 9.05882 3.62901 9.05882 4.11765C9.05882 4.77289 8.79853 5.40129 8.33521 5.86462C7.87188 6.32794 7.24348 6.58824 6.58824 6.58824ZM14.6094 6.85176C15.1364 6.25827 15.4807 5.5251 15.6008 4.74051C15.7208 3.95592 15.6116 3.15336 15.2862 2.42941C14.9607 1.70547 14.433 1.09101 13.7665 0.659995C13.1 0.228982 12.3231 -0.000212141 11.5294 1.47338e-07C11.311 1.47338e-07 11.1015 0.0867646 10.9471 0.241206C10.7926 0.395648 10.7059 0.605116 10.7059 0.82353C10.7059 1.04194 10.7926 1.25141 10.9471 1.40585C11.1015 1.56029 11.311 1.64706 11.5294 1.64706C12.1847 1.64706 12.8131 1.90735 13.2764 2.37068C13.7397 2.834 14 3.46241 14 4.11765C13.9988 4.5502 13.8841 4.97486 13.6673 5.34917C13.4506 5.72348 13.1393 6.03431 12.7647 6.25059C12.6426 6.32102 12.5406 6.42161 12.4685 6.54273C12.3964 6.66385 12.3566 6.80145 12.3529 6.94235C12.3495 7.08216 12.3817 7.22054 12.4465 7.34445C12.5114 7.46836 12.6067 7.57371 12.7235 7.65059L13.0447 7.86471L13.1518 7.92235C14.1444 8.39318 14.9819 9.13787 15.5655 10.0687C16.1491 10.9996 16.4546 12.0778 16.4459 13.1765C16.4459 13.3949 16.5326 13.6044 16.6871 13.7588C16.8415 13.9132 17.051 14 17.2694 14C17.4878 14 17.6973 13.9132 17.8517 13.7588C18.0062 13.6044 18.0929 13.3949 18.0929 13.1765C18.0997 11.9127 17.7831 10.6682 17.1734 9.56123C16.5637 8.45425 15.6811 7.52155 14.6094 6.85176Z"
                    fill="#6B6D7F"
                  />
                </svg>
                {dao.num_members}
              </span>
              <span className="flex flex-row gap-1 items-center flex-1 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {dao.num_proposals}
              </span>
              <span className="flex flex-row gap-1 items-center flex-1 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {dao.num_datasets}
              </span>
            </div>
            <div className="px-6 pt-4 pb-2">
              {dao.hash_tags.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
