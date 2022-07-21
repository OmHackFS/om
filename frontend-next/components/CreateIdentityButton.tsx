import { LinkIcon } from "@heroicons/react/solid";
import { MouseEvent } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

type ActivateFunction = (
  connector: AbstractConnector,
  onError?: (error: Error) => void,
  throwErrors?: boolean
) => Promise<void>;

export const CreateIdentityButton = () => {
  const context = useWeb3React<Provider>();
  const { activate } = context;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    async function _activate(activate: ActivateFunction): Promise<void> {
      await activate(injected);
    }

    _activate(activate);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex w-48 justify-center py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#] hover:bg-[#] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#]"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      Create Identity
    </button>
  );
};
