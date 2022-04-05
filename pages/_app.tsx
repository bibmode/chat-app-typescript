import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutContextProvider from "../components/context/LayoutContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutContextProvider>
      <Component {...pageProps} />
    </LayoutContextProvider>
  );
}

export default MyApp;
