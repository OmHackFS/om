import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { SidebarNavigation } from "../components/SidebarNavigation";
import { getProvider } from "../utils/provider";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const isLoginScreen = router.pathname === "/";

  return (
    <>
      <Web3ReactProvider getLibrary={getProvider}>
        {!isLoginScreen ? <SidebarNavigation /> : null}
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;
