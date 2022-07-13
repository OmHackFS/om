import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { SidebarNavigation } from "../components/SidebarNavigation";
import { getProvider } from "../utils/provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider getLibrary={getProvider}>
        <SidebarNavigation />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
